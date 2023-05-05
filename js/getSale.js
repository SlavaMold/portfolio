document.addEventListener('DOMContentLoaded', function () {

    $('.right-btn').click(function(){
        $('.info-sale-block').addClass('info-sale-block-shown');
        $('body').css('overflow', 'hidden');

        setTimeout(function(){
            $('.info-holder').addClass('info-holder-shown');
        }, 300); 
        
    });

})