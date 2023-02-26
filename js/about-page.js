document.querySelectorAll('.accord-button').forEach((el) => {
    el.addEventListener('click', () => {
        let content = el.nextElementSibling;


        if(content.style.maxHeight){
            document.querySelectorAll('.acc-cont').forEach((el) => el.style.maxHeight = null)
        }
        else{
            document.querySelectorAll('.acc-cont').forEach((el) => el.style.maxHeight = null);
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    })
})