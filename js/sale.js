let sale = false;
let price;
document.addEventListener('DOMContentLoaded', function () {

    $('#getSale').click(function () {
        localStorage.setItem('sale', true);
    });

    checkSale();
    setTimeout(select, 1000);
    function select() {
        console.log(sale);
        if (sale == true) {
            price = document.getElementsByTagName('i');
            console.log(price);
            console.log(price.length);
            for (let i = 0; i < price.length; i++) {
                let ctPrice = JSON.parse(price[i].innerHTML);
                console.log(ctPrice);
                let newPrice = ctPrice * 0.8;
                price[i].innerHTML = '<span class="line-through">' + ctPrice + '</span>' + newPrice;
            }

        }
    }

})

function checkSale() {
    let buf = JSON.parse(localStorage.getItem('sale'));
    if (buf == true) {
        sale = true;
    }
}
