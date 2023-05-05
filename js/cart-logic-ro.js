setTimeout(function(){
var cart = {};
let cartQuantity = 0;
let spanQuantity = document.querySelector('.cart-quantity');
let spanQuantityBurger = document.querySelector('.cart-quantity-burger');
$('document').ready(function () {
    checkCart();
    checkQuantity();
    showMiniCart();
    console.log(cart);
    document.querySelectorAll('.add-to-cart').forEach((el) => {
        el.addEventListener('click', () => addToCart(el))
    });
})

function showMiniCart() {
    let out = '';
    if (cart != null) {
        out = '!';
        spanQuantityBurger.classList.remove('shown');
        spanQuantity.classList.remove('shown');
        spanQuantityBurger.innerHTML = out;
        spanQuantity.innerHTML = out;
    }
    if (cart == null) {
        spanQuantityBurger.classList.add('shown');
        spanQuantity.classList.add('shown');
    }

}

function checkCart() {
    if (localStorage.getItem('cart') != undefined) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    else {
        cart = null;
        localStorage.setItem('cart', JSON.stringify(null));
    }
}

function checkQuantity() {

    if (localStorage.getItem('cartQuantity') != null) {
        cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
    }

    if (localStorage.getItem('cartQuantity') != undefined) {
        cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
    }

    if (localStorage.getItem('cartQuantity') == undefined) {
        localStorage.setItem('cartQuantity', 0);
    }

}

function createMessage(){
    let block = document.querySelector('.insert-message');
    block.innerHTML += `
                    <div class="cart-message">
                        <div class="cart-message-text">
                            <span> Serviciu adăugat în coș! </span>
                        </div>
                    </div>
    `;
}

function showMessage(){
        let message = document.querySelector('.cart-message');
        message.classList.add('vieved');
}

function deleteMessage(){
    setTimeout(() => {
        let message = document.querySelector('.cart-message');
        message.classList.remove('vieved');
      
    }, 2000);
  
}
function addToCart(el) {

    if (cart == null) {
        cart = {};
    }

    cart[cartQuantity] = $(el).attr('data');
    console.log(cart);
    cartQuantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    createMessage();
    setTimeout(showMessage, 1000);
    setTimeout(deleteMessage, 1000);
    showMiniCart();
}
}, 1000);