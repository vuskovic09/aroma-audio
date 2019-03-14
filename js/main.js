$(document).ready(function(){
  showTrending();
  showNews();
  showProducts();
  showCategories();
  var itemNo = localStorage.getItem('cart');
  $('.cart-icon').html(itemNo);

  $('.sort-element').click(function(){
    onSortProducts.call(this);
  });
});

// PRODUCTS
function ajaxProducts(callbackSuccess){
  $.ajax({
    url: "data/products.json",
    method: "GET",
    success: callbackSuccess
  });
}

function showTrending(){
  ajaxProducts(function(products){
    printTrending(products);
  });
}

function printTrending(products){
  let html = "";
  for(let product of products){
    if(product.trending == true){
      html += printOneProduct(product);
    }
  }
  $('.trendingProducts').html(html);
}

function showProducts() {
  ajaxProducts(function(products){
    printProducts(products);
  });
}

function printProducts(products){
  let html = "";
  for(let product of products){
    html += printOneProduct(product);
  }
  $('.products').html(html);

  $('.addToCart').click(addToCart);
}

function printOneProduct(product){
    return`<div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card text-center card-product">
              <div class="card-product__img">
                <img class="card-img" src="${product.img.src}" alt="${product.img.alt}">
                <ul class="card-product__imgOverlay">
                  <li><a class="addToCart" data-id="${product.id}" href="#"><button><i class="ti-shopping-cart"></i></button></a></li>
                  <li><p class="notify">Item added to cart</p></li>
                </ul>
              </div>
              <div class="card-body">
                <p>${product.category.name}</p>
                <h4 class="card-product__title"><a href="single-product.html">${product.name}</a></h4>
                <p class="card-product__price">$${product.price}</p>
              </div>
            </div>
          </div>`;
}

// NEWS
function showNews(){
  $.ajax({
    url: "data/news.json",
    method: "GET",
    success: function(news){
      writeNews(news);
    }
  });
}

function writeNews(news){
  let html = "";
  for(let article of news){
    html += writeOneArticle(article);
  }
  $('.news').html(html);
}

function writeOneArticle(article){
  return `<div class="col-md-6 col-lg-4 mb-4 mb-lg-0">
            <div class="card card-blog">
              <div class="card-blog__img">
                <img class="card-img rounded-0" src="${article.img.src}" alt="${article.img.alt}">
              </div>
              <div class="card-body">
                <ul class="card-blog__info">
                  <li>${article.author}</li>
                  <li><i class="ti-comments-smiley"></i>${article.commentNo} Comments</li>
                </ul>
                <h4 class="card-blog__title">${article.title}</h4>
                <p>${article.content}</p>
              </div>
            </div>
          </div>`;
}

// CATEGORIES
function showCategories(){
  $.ajax({
      url: "data/categories.json",
      method: "GET",
      success: function(categories){
        printCategories(categories);
      }
    });
}

function printCategories(categories){
  let html = "";
    for(let category of categories){
        html += printOneCategory(category);
    }
    $(".ctFilter").html(html);

    $('.filter-category').change(onFilterByCategory);
}

function printOneCategory(category, productNumber){
  return `<li class="filter-list"><input class="pixel-radio filter-category" type="radio" data-id="${category.ctID}" name="brand"><label>${category.ctName}</label></li>`;
}

function onFilterByCategory(){
  let ctID = $(this).data('id');
  if($(this).data('id') == 1){
    showProducts();
  } else {
    ajaxProducts(function(products){
      products = filterByCategory(products, ctID);
      printProducts(products);
    });
  }
}

function filterByCategory(products, ctID){
  return products.filter(x => x.category.id == ctID);
}

// SORTING PRODUCTS
function onSortProducts(){
    let sortBy = $(this).data('sortby');
    let order = $(this).data('order');
    console.log(sortBy + "=" + order);

    ajaxProducts(function(products){
        sortProducts(products, sortBy, order);
        printProducts(products);
    });
}


function sortProducts(products, sortBy, order) {
    products.sort(function(a,b){
        let valueA = (sortBy=='name')? a.price : a.name;
        let valueB = (sortBy=='price')? b.price : b.name;
        if(valueA > valueB)
            return order=='asc' ? 1 : -1;
        else if(valueA < valueB)
            return order=='asc' ? -1 : 1;
        else
            return 0;
    });
}


// SHOPPING CART - ADD
var cartValue = -0;
function addToCart(product){
  cartValue += 1;
  localStorage.setItem('cart', cartValue);
  event.preventDefault(product);
  $('.notify').fadeIn(1000).fadeOut(1500);
  $('.cart-icon').html(cartValue)
  let id = $(this).data('id');
  var products = productsInCart();

  if(products) {
    if(productInCart()) {
      updateQuantity();
    } else {
      addToLocal();
    }
  } else {
    addFirstToLocal();
  }
  function productInCart(){
    return products.filter(p => p.id == id).length;
}

function addToLocal(){
  let products = productsInCart();
  products.push({
    id: id,
    quantity: 1
  });
  localStorage.setItem('products', JSON.stringify(products));
}

function updateQuantity(){
  let products = productsInCart();
  for(let i in products){
    if(products[i].id == id){
      products[i].quantity++;
      break;
    }
  }
  localStorage.setItem('products', JSON.stringify(products));
}

function productsInCart() {
  return JSON.parse(localStorage.getItem("products"));
}

function addFirstToLocal() {
  let products = [];
  products[0] = {
    id: id,
    quantity: 1
  };
  localStorage.setItem('products', JSON.stringify(products));
}
}

function clearCart() {
  localStorage.removeItem('products');
}

// HELPER FUNCTIONS
function inArray(array, element){
  return array.indexOf(element)!==-1;
}

function getStorage(){
  return JSON.parse(localStorage.getItem('sort'));
}

function setStorage(value){
  return localStorage.setItem('sort', JSON.stringify(value));
}

function emptyStorage(){
  return localStorage.getItem('sort') == null;
}







// TEMPLATE JS
$(function() {
  "use strict";


  //------- Active Nice Select --------//
  $('select').niceSelect();

  //------- hero carousel -------//
  $(".hero-carousel").owlCarousel({
    items:3,
    margin: 10,
    autoplay:false,
    autoplayTimeout: 5000,
    loop:true,
    nav:false,
    dots:false,
    responsive:{
      0:{
        items:1
      },
      600:{
        items: 2
      },
      810:{
        items:3
      }
    }
  });


  //------- mailchimp --------//
	function mailChimp() {
		$('#mc_embed_signup').find('form').ajaxChimp();
	}
  mailChimp();

  //------- fixed navbar --------//
  $(window).scroll(function(){
    var sticky = $('.header_area'),
    scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
  });


});
