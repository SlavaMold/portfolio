let sale = false;
let timeToENd = 0;
let price;
document.addEventListener('DOMContentLoaded', function () {

    Date.prototype.daysInMonth = function () {
        return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
    };

    $('#getSale').click(function () {
        localStorage.setItem('sale', true);
        let date = new Date();
        let day = date.getDate();
        day = day + 15;
        let cmonth = date.daysInMonth();
        if (day > cmonth) {
            day = day - cmonth;
            let dToLS = {
                cmonth: date.getMonth()+1,
                day: day,
                hours: date.getHours(),
                minutes: date.getMinutes()
            };
            localStorage.setItem('dateToEnd', JSON.stringify(dToLS));
        }
        else {
            let dToLS = {
                cmonth: date.getMonth(),
                day: day,
                hours: date.getHours(),
                minutes: date.getMinutes()
            };
            localStorage.setItem('dateToEnd', JSON.stringify(dToLS));
        }

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

