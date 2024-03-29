"use strict"
let summary = 0;
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
        function checkSale() {
            let buf = JSON.parse(localStorage.getItem('sale'));
            if (buf == true) {
                return true;  
            }
            else{
                return false;
            }
        }
        function showCart() {
            let out = '';
            if (cart == null) {
                out = '';
                out += `<div class="container">
                        <div class="thanks">
                        <div class="thank-tex">
                        Nu aveți servicii selectate.
                        </div>
                        <div class="back-butt-div">
                        <a class="back-butt" href="../pages/about-page-ro.html">Înapoi</a>
                        </div> </div> </div>`;

                $('#cart-content').html(out);

            }
            else {
                summary = 0;
                let sale = checkSale();
                out += '<div class="product-list">';
                out += '<div class="product-items">';
                for (var key in cart) {
                    let cPrice = data[cart[key]]['cost'];
                    if (sale == true) {
                        console.log('slae1!');
                        cPrice = cPrice * 0.8;
                    }else{
                        cPrice = cPrice * 1;
                    }
                    if (data[cart[key]].Msq == 'YES') {
                        out += '<div class="product-item">';
                        out += '<button class="delete" data-art="' + key + '"><img class="delete_img" src="../img/trash.png"></button>';
                        out += '<img class="product-img" src="' + data[cart[key]]['image'] + '">';
                        if (data[cart[key]].Special == 'YES') {
                            out += '<div class="product-txt1"> <div class="product-descr">' + data[cart[key]]['name'] + ' <br><span class="price-about">începand de la <i name="cost">' + cPrice + '</i> MDL/M<sup>2</sup>' + ' <br>' + data[cart[key]]['description'] + '</span></div>';
                        }
                        else {
                            out += '<div class="product-txt1"> <div class="product-descr">' + data[cart[key]]['name'] + ' <br><span class="price-about"> <i name="cost">' + cPrice + '</i> MDL/M<sup>2</sup>' + ' <br>' + data[cart[key]]['description'] + '</span></div>';
                        }
                        out += '</div>';
                        out += '</div>';
                    }
                    if (data[cart[key]].Msq == 'NO') {
                        out += '<div class="product-item">';
                        out += '<button class="delete" data-art="' + key + '"><img class="delete_img" src="../img/trash.png"></button>';
                        out += '<img class="product-img" src="' + data[cart[key]]['image'] + '">';
                        if (data[cart[key]].Special == 'YES') {
                            out += '<div class="product-txt1"> <div class="product-descr">' + data[cart[key]]['name'] + ' <br><span class="price-about"> <span>începand de la <i name="cost" class="space">' + cPrice + '</i> </span> MDL' + ' <br><br>' + data[cart[key]]['description'] + ' </span></div>';
                        }
                        else {
                            out += '<div class="product-txt1"> <div class="product-descr">' + data[cart[key]]['name'] + ' <br><span class="price-about"> <span> <i name="cost">' + cPrice + '</i> </span> MDL' + ' <br><br>' + data[cart[key]]['description'] + ' </span></div>';
                        }
                        out += '</div>';
                        out += '</div>';
                    }
                    summary += cPrice;
                }
                out += '</div>';
                out +=`
                    <div class="summary"> 
                        <span id="total-span"> Total: <i id="total">` + summary + `</i> MDL </span>
                    </div>
                `;
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

        function getGoods() {
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