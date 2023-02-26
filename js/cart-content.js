"use strict"
let spanQuantity = document.querySelector('.cart-quantity');
let spanQuantityBurger = document.querySelector('.cart-quantity-burger');
document.addEventListener('DOMContentLoaded', function () {
    var cart = 0;
    let cartQuantity = 0;
    checkQuantity();
    $.getJSON('goods.json', function (data) {
        var goods = data;
        checkCart();
        showMiniCart();
        showCart();
        function showCart() {
            if (cart < 0) {
                var out = '';
                out += `<div class="container">
                        <div class="thanks">
                        <div class="thank-tex">
                        Вы не выбрали ни одной услуги.
                        </div>
                        <div class="back-butt-div">
                        <a class="back-butt" href="../pages/about-page.html">Вернуться</a>
                        </div> </div> </div>`;

                $('#cart-content').html(out);
                comanda();

            }

            else {
                if (data[cart].Msq == 'YES') {
                    var out = '';
                    out += '<div class="product-list">';
                    out += '<div class="product-items">';
                    out += '<div class="product-item">';
                    out += '<button class="delete"><img class="delete_img" src="../img/trash.png"></button>';
                    out += '<img class="product-img" src="' + data[cart].image + '">';
                    out += '<div class="product-txt1"> <div class="product-descr">' + data[cart]['name'] + ' <br><span class="price-about">' + data[cart]['cost'] + ' MDL/M<sup>2</sup>' + ' <br>' + data[cart]['description'] + '</div>';
                    out += '</div>';
                    out += '</span>';
                    out += '</div>';
                    out += '</article>';
                    comanda();
                }
                if (data[cart].Msq == 'NO') {
                    var out = '';
                    out += '<div class="product-list">';
                    out += '<div class="product-items">';
                    out += '<div class="product-item">';
                    out += '<button class="delete"><img class="delete_img" src="../img/trash.png"></button>';
                    out += '<img class="product-img" src="' + data[cart].image + '">';
                    out += '<div class="product-txt1"> <div class="product-descr">' + data[cart]['name'] + ' <br><span> ' + data[cart]['cost'] + ' MDL </span>' + ' <br>' + data[cart]['description'] + '</div>';
                    out += '</div>';
                    out += '</span>';
                    out += '</div>';
                    out += '</article>';
                    comanda();
                }


            }
            function comanda() {
                if (cart < 0) { out2 = ''; }
                else {
                    var out2 = '';

                }

            }
            $('#cart-content').html(out);
            $('.delete').on('click', deleteGoods);

        }

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

        function saveQuantityToStorage() {
            localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
        }

        function saveCartToStorage() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        function deleteGoods() {
            cartQuantity = 0;
            cart = -1;
            saveCartToStorage();
            saveQuantityToStorage();
            showCart();
            showMiniCart();
            let form1 = document.querySelector('.form');
            form1.classList.add('shown');
            spanQuantityBurger.classList.add('shown');
            spanQuantity.classList.add('shown');
        }

    })

    function checkCart() {

        if (localStorage.getItem('cart') != null) {
            cart = JSON.parse(localStorage.getItem('cart'));
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

})