document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.accord-button').forEach((el) => {
        el.addEventListener('click', () => {
            let content = el.nextElementSibling;


            if (content.style.maxHeight) {
                document.querySelectorAll('.acc-cont').forEach((el) => el.style.maxHeight = null)
            }
            else {
                document.querySelectorAll('.acc-cont').forEach((el) => el.style.maxHeight = null);
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        })
    })

    let sal = JSON.parse(localStorage.getItem('sale'));
    if(sal == true){
        let Prices = document.querySelectorAll('b');
        Prices.forEach(element => {
            oldPrice = JSON.parse(element.innerText);
            newPrice = '<span class="line-through">' + oldPrice + '</span>';
            newPrice += newPrice = oldPrice * 0.8;
            element.innerHTML = newPrice; 
        });
        let blocks = document.querySelectorAll('.product-descr');
        blocks.forEach(el =>{
            let DayToEndOfSale = JSON.parse(localStorage.getItem('dateToEnd'));

            let Mon = JSON.parse(DayToEndOfSale.cmonth)+1;
            let Day = JSON.parse(DayToEndOfSale.day);
            let Hou = JSON.parse(DayToEndOfSale.hours);
            let Min = JSON.parse(DayToEndOfSale.minutes);

            let mass = [Mon, Day, Hou, Min];
            for(let key = 0; key < mass.length; key++){
                if(mass[key] < 10){
                    mass[key] = '0' + mass[key];
                }
            }

            let newHtml = el.innerHTML;
            newHtml += '<div class="col-2"><img class="sale" src="../img/other/sale.png"><span>Скидка действует до </span>';
            newHtml += `
                <table class="timeTo">
                <tr class="wrap"> <td class="val">`+ mass[0] +`</td> <td class="bord"> : </td> <td class="val">`+ mass[1] +`</td> <td class="bord"> : </td> <td class="val">`+ mass[2] +`</td> <td class="bord"> : </td> <td class="val">`+ mass[3] +`</td> </tr>
                </table></div>
            `;

            el.innerHTML = newHtml;
        });
    }

})

