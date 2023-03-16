"use strict"
let spanQuantity = document.querySelector('.cart-quantity');
let spanQuantityBurger = document.querySelector('.cart-quantity-burger');
document.addEventListener('DOMContentLoaded', function () {
    var cart = {};
    let cartQuantity = 0;
    checkQuantity();
    checkCart();
    const form = document.getElementById('form');
    form.classList.remove('.shown');

    $.getJSON('goods-ro.json', function (data) {
        showMiniCart();
        showCart();
        getGoods();
        function showCart() {
            let out = '';
            if (cart == null) {
                out = '';
                out += `<div class="container">
                        <div class="thanks">
                        <div class="thank-tex">
                        Niciun serviciu selectat.
                        </div>
                        <div class="back-butt-div">
                        <a class="back-butt" href="../pages/about-page-ro.html">Înapoi</a>
                        </div> </div> </div>`;

                $('#cart-content').html(out);

            }
            else {
                out += '<div class="product-list">';
                out += '<div class="product-items">';
                for (var key in cart) {
                    if (data[cart[key]].Msq == 'YES') {
                        out += '<div class="product-item">';
                        out += '<button class="delete" data-art="' + key + '"><img class="delete_img" src="../img/trash.png"></button>';
                        out += '<img class="product-img" src="' + data[cart[key]]['image'] + '">';
                        out += '<div class="product-txt1"> <div class="product-descr">' + data[cart[key]]['name'] + ' <br><span class="price-about"> <span> <i name="cost">' + data[cart[key]]['cost'] + '</i> </span> MDL/M<sup>2</sup>' + ' <br>' + data[cart[key]]['description'] + '</span></div>';
                        out += '</div>';
                        out += '</div>';
                    }
                    if (data[cart[key]].Msq == 'NO') {
                        out += '<div class="product-item">';
                        out += '<button class="delete" data-art="' + key + '"><img class="delete_img" src="../img/trash.png"></button>';
                        out += '<img class="product-img" src="' + data[cart[key]]['image'] + '">';
                        out += '<div class="product-txt1"> <div class="product-descr">' + data[cart[key]]['name'] + ' <br><span class="price-about"> <span> <i name="cost">' + data[cart[key]]['cost'] + '</i> </span> MDL' + ' <br><br>' + data[cart[key]]['description'] + ' </span></div>';
                        out += '</div>';
                        out += '</div>';
                    }

                }
                out += '</div>';
            }
            $('#cart-content').html(out);

            $('.delete').on('click', deleteGoods);

        }

        function showMiniCart() {
            let out2 = '';
            if (cart != null) {
                out2 = '!';
                spanQuantityBurger.classList.remove('shown');
                spanQuantity.classList.remove('shown');
                spanQuantityBurger.innerHTML = out2;
                spanQuantity.innerHTML = out2;
            }
            if (cart == null) {
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
            var articul = $(this).attr('data-art');
            cartQuantity--;
            delete cart[articul];
            if (cartQuantity == 0) {
                cart = null;
                console.log('cart is empty');
                let form1 = document.querySelector('.forma');
                form1.classList.add('shown');
                spanQuantityBurger.classList.add('shown');
                spanQuantity.classList.add('shown');
            }
            saveCartToStorage();
            saveQuantityToStorage();
            showCart();
            showMiniCart();  
            getGoods();
        }

        function getGoods(){
            let goodslist = '';
          goods = document.querySelectorAll('.product-descr').forEach((el) => {
            goodslist += el.firstChild.data + ', ';
          })  
            localStorage.setItem('goodslist', null);
            localStorage.setItem('goodslist', JSON.stringify(goodslist));
          }

    })

    function checkCart() {
        if (localStorage.getItem('cart') != undefined) {
            cart = JSON.parse(localStorage.getItem('cart'));
            console.log(cart);
        }
        else {
            localStorage.setItem('cart', JSON.stringify(null));
            cart = null;
        }
    }


    function checkQuantity() {

        if (localStorage.getItem('cartQuantity') != null) {
            cartQuantity = JSON.parse(localStorage.getItem('cartQuantity'));
        }
        else {
            localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));

        }

    }

})