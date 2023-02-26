var cart = 0;
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
    if (cart > -1) {
        out = '!';
        spanQuantityBurger.classList.remove('shown');
        spanQuantity.classList.remove('shown');
        spanQuantityBurger.innerHTML = out;
        spanQuantity.innerHTML = out;
    }
    if (cart == -1) {
        spanQuantityBurger.classList.add('shown');
        spanQuantity.classList.add('shown');
    }

}

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    else {
        localStorage.setItem('cart', JSON.stringify(0));
        
    }
}

function checkQuantity() {

    if (localStorage.getItem('cartQuantity') != null) {
        cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
    }
    else {
        localStorage.setItem('cartQuantity', JSON.stringify(0));
        
    }

}

function addToCart(el) {
    console.log(cart);
    //добавляем товар в корзину
    if (cart > 0) {
        cart = 0;
        cartQuantity = 0;
    }

    cart = $(el).attr('data');
    console.log(cart);
    cartQuantity = 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
    //console.log(cart);
    showMiniCart();
}
