const burger = document.getElementById('burg');
const menu = document.getElementById('menu-slide');

const headTitle = document.querySelector('.header-title');
burger.innerHTML = '<img src="img/main-page/icons/burger.png">';

burger.addEventListener('click', () => {
    menu.classList.toggle('active');

    if(menu.classList.contains('active')){
        headTitle.classList.remove('margin');
        burger.innerHTML = '<img src="img/main-page/icons/burger.png">';
    }
    else{
        headTitle.classList.add('margin');
        burger.innerHTML = '<img src="img/main-page/icons/burger-close.png">';
    }
});