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

function addToCart(el) {
    //добавляем товар в корзину
    if (cart == null) {
        cart = {};
    }
    if(cartQuantity == 3){
        alert('Возможно выбрать максимум 3 типа услуг одновременно');
        return;
    }

    cart[cartQuantity] = $(el).attr('data');
    console.log(cart);
    cartQuantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    showMiniCart();
}
