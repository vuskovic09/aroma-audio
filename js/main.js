$(document).ready(function() {
  console.log("test");
  $.ajax({
    url: "data/products.json",
    type: "json",
    method: "GET",
    success: function(products){
      writeTrending(products);
    },
    error: function(){
      console.log("error");
    }
  });

  $.ajax({
    url: "data/news.json",
    type: "json",
    method: "GET",
    success: function(news){
      writeNews(news);
    },
    error: function(){
      console.log("error");
    }
  });

  $.ajax({
    url: "data/products.json",
    type: "json",
    method: "GET",
    success: function(products){
      writeProducts(products);
    },
    error: function(){
      console.log("error");
    }
  });


});

function writeTrending(products){
  let html = "";
  for(let product of products){
    if(product.trending == true){
      html += writeOneProduct(product);
    }
  }
  $('.trendingProducts').html(html);
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
                <h4 class="card-blog__title"><a href="#">${article.title}</a></h4>
                <p>${article.content}</p>
              </div>
            </div>
          </div>`;
}

function writeProducts(products){
  let html = "";
  for(let product of products){
    html += writeOneProduct(product);
  }
  $('.products').html(html);
}

function writeOneProduct(product){
  return `<div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card text-center card-product">
              <div class="card-product__img">
                <img class="card-img" src="${product.img.src}" alt="${product.img.alt}">
                <ul class="card-product__imgOverlay">
                  <li><button><i class="ti-shopping-cart"></i></button></li>
                </ul>
              </div>
              <div class="card-body">
                <p>${product.category.name}</p>
                <h4 class="card-product__title"><a href="single-product.html">${product.name}</a></h4>
                <p class="card-product__price">${product.price}</p>
              </div>
            </div>
          </div>`;
}


$(function() {
  "use strict";

  //------- Parallax -------//
  skrollr.init({
    forceHeight: false
  });

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
