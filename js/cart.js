$(document).ready(function () {
  let products = productsInCart();

  if(products == null){
    showEmptyCart();
  } else {
    displayCartData();
  }


});

function displayCartData() {
    let products = productsInCart();

    $.ajax({
        url : "data/products.json",
        success : function(data) {
            let productsForDisplay = [];

            //izdvajanje objekata dohvacenih ajaxom tako da tu budu samo objekti koji su u localstorage i dodavanje kolicine
            data = data.filter(p => {
                for(let product of products)
                {
                    if(p.id == product.id) {
                        p.quantity = product.quantity;
                        return true;
                    }

                }
                return false;
            });
            generateTable(data)
        }
    });
}

function generateTable(products) {
  let html =
  `<table class="table">
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
        </tr>
    </thead>
    <tbody>`;

    for (let p of products) {
      html += generateTr(p);
    }

    html += `<tr class="bottom_button">
                <td>
                    <a class="button" href="#">Reset Cart</a>
                </td>
                <td>

                </td>
                <td>

                </td>
                <td>
                    <div class="cupon_text d-flex align-items-center">
                        <a class="primary-btn resetBTN" href="#">Remove all items</a>
                    </div>
                </td>
            </tr>
        </tbody>
        </table>`;
    $('#tableContent').html(html);

    function generateTr(p) {
      return `<tr>
          <td>
              <div class="media">
                  <div class="d-flex">
                      <img src=${p.img.src} alt="${p.img.alt}">
                  </div>
                  <div class="media-body">
                      <p>${p.name}</p>
                  </div>
              </div>
          </td>
          <td>
              <h5>${p.price}</h5>
          </td>
          <td>
              <div class="product_count">
                  <p>Quantity: <span class="qty">${p.quantity}</span></p>
              </div>
          </td>
          <td>
              <h5>${p.price * p.quantity}</h5>
          </td>
      </tr>`;
    }

    $('.resetBTN').click(removeFromCart);
}

function showEmptyCart() {
    $("#tableContent").html("<h1>Your cart is empty!</h1>")
}

function productsInCart() {
    return JSON.parse(localStorage.getItem("products"));
}

function removeFromCart() {
  event.preventDefault();
  localStorage.clear();
  showEmptyCart();
}
