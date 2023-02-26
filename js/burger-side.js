const burger = document.getElementById('burg');
const menu = document.getElementById('menu-slide');


window.onload = function () {
    burger.innerHTML = '<img src="../img/main-page/icons/burger.png">';
}


burger.addEventListener('click', () => {
    menu.classList.toggle('active');

    if(menu.classList.contains('active')){
     
        burger.innerHTML = '<img src="../img/main-page/icons/burger.png">';
    }
    else{
        burger.innerHTML = '<img src="../img/main-page/icons/burger-close.png">';
    }
});