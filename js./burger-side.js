const burger = document.querySelector('.header-burger');
const menu = document.getElementById('menu-slide');


window.onload = function () {
   
}


burger.addEventListener('click', () => {
    menu.classList.toggle('active');

    if(menu.classList.contains('active')){
     
        
    }
    else{
        
    }
});

$('.drop-activator').click(function(){
    let block = document.querySelector('.dropdown-content');
    block.classList.toggle('dropdown-content-active');

    
})