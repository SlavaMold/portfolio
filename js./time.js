
class DateTime {
    constructor(FcompareH, FcompareM, ScompareH, ScompareM, Day) {
        this.FcompareH = FcompareH;
        this.FcompareM = FcompareM;

        this.ScompareH = ScompareH;
        this.ScompareM = ScompareM;

        this.Day = Day;
    }
}

let dts = new DateTime;
let iterator = 0;

const days = document.querySelectorAll('.graffic-li');

window.onload = function () {
    getRas();
    window.setInterval(function () {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let day = date.getDay();

        let openOrClosed = document.querySelector('.ooc');
        // console.log();
        if (hours < dts[day].ScompareH & hours >= 9) {
                openOrClosed.classList.add('open');
                openOrClosed.innerHTML = 'Открыто';
        }

        if (hours >= dts[day].ScompareH) {
           
            openOrClosed.classList.add('closed');
            openOrClosed.classList.remove('open');
            openOrClosed.innerHTML = 'Закрыто';
        }
       

        for (let i = 0; i < 7; i++) {
            
            if (days[i].firstChild.id == day) {
                days[i].firstChild.innerHTML = '<img src="img/other/red-crown.png">';
                days[i].firstChild.nextSibling.classList.add('red');
            }
            else {
                days[i].firstChild.innerHTML = '<img src="img/other/crown.png">';
                days[i].firstChild.nextSibling.classList.remove('red');
            }
        }

    }), 1000;
}



function getRas() {
    dts[0] = new DateTime(9, 0, 15, 0, '0');
    dts[1] = new DateTime(9, 0, 18, 0, '1');
    dts[2] = new DateTime(9, 0, 18, 0, '2');
    dts[3] = new DateTime(9, 0, 18, 0, '3');
    dts[4] = new DateTime(9, 0, 18, 0, '4');
    dts[5] = new DateTime(9, 0, 18, 0, '5');
    dts[6] = new DateTime(9, 0, 15, 0, '6');

}

