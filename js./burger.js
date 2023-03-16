const burger = document.querySelector('.header-burger');
const menu = document.getElementById('menu-slide');

const headTitle = document.querySelector('.header-title');


burger.addEventListener('click', () => {
    menu.classList.toggle('active');
    burger.classList.toggle('burg-active');

    if(menu.classList.contains('active')){
        headTitle.classList.remove('margin');  
    }
    else{
        headTitle.classList.add('margin'); 
    }
});

$('.drop-activator').click(function(){
    let block = document.querySelector('.dropdown-content');
    block.classList.toggle('dropdown-content-active');

    
})