let dialog = document.querySelector('.insertCookies');
let accept = false;
let toHtml = '';
$('document').ready(function () {
    checkLocalStorage();
    if(accept == false){
        $('.close-dialog').on('click', accetCookies)
    }
})

function checkLocalStorage(){
    let check = localStorage.getItem('accept');
    if(check == true){
        toHtml = '';
        dialog.innerHTML = toHtml;
        accept = true;
    }
    if(check == undefined){
        accept = false;

        toHtml = `
        <div class="dialog"> 
         <div class="cookies-hold"> 
                 <span class="cookie-descr">
                     Мы используем файлы cookie. Продолжив использование сайта, вы соглашаетесь 
                     с Политикой использования файлов cookie.
                 </span>
              <button class="close-dialog"> Ясно! </button>
            </div>
        </div>
        `;
        dialog.innerHTML = toHtml;
    }
    if(check == false){
        accept = false;

        toHtml = `
        <div class="dialog"> 
         <div class="cookies-hold"> 
                 <span class="cookie-descr">
                     Мы используем файлы cookie. Продолжив использование сайта, вы соглашаетесь 
                     с Политикой использования файлов cookie.
                 </span>
              <button class="close-dialog"> Ясно! </button>
            </div>
        </div>
        `;
        dialog.innerHTML = toHtml;
    }
}

function accetCookies(){
    localStorage.setItem('accept', true);
    accept = true;
    
    toHtml = '';
    dialog.innerHTML = toHtml;
    
}
