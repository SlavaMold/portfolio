
let cart = 0;
checkCart();
function checkCart() {
    
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

const Ordered = document.getElementById('formOrdered');
const NoOrdered = document.getElementById('formNoOrdered');


document.addEventListener('DOMContentLoaded', function () {

    Ordered.addEventListener('click', () => {
        Ordered.removeAttribute('required');
        Ordered.setAttribute('checked', '');
        NoOrdered.removeAttribute('checked');
        NoOrdered.setAttribute('required', '');
    })

    NoOrdered.addEventListener('click', () => {
        NoOrdered.removeAttribute('required');
        NoOrdered.setAttribute('checked', '');
        Ordered.removeAttribute('checked');
        Ordered.setAttribute('required', '');
    })



    const form = document.getElementById('form');
    if (cart > -1) {

        form.addEventListener('submit', formSend);

        // form.addEventListener('submit', formSend);


        async function formSend(e) {
            e.preventDefault();

            let error = formValidate(form);
            
            if (error == 0) {
                window.location.href = 'thanks.html';
            } else {
                alert('Заполните обязательные поля!');
            }
        }


        function formValidate(form) {
            let error = 0;
            let formReq = form.querySelectorAll('.req');
            console.log(formReq);

            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);

                if (input.classList.contains('_email')) {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                }
                else {
                    if (input.value == '') {
                        formAddError(input);
                        error++;
                    }
                    else{
                        formRemoveError(input)
                    }
                }
                if(input.classList.contains('file-input')){
                    if(fileTest(input)){
                        formAddError(input);
                        error++;
                    }
                }

            }
            console.log(error);
            return error;
        }

        function formAddError(input) {
            input.parentElement.classList.add('error');
            input.classList.add('error');
        }

        function formRemoveError(input) {
            input.parentElement.classList.remove('error');
            input.classList.remove('error');
        }

        function fileTest(input){
            if(input.value == ''){
                alert('Прикрепите файл!');
                return;
            }
            else{
                formRemoveError(input);
            }
        }

        function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value);
        }

        const formImage = document.getElementById('formImage');
        const imagePreview = document.getElementById('imagePreview');
        

        formImage.addEventListener('change', () => {
            uploadFile(formImage.files[0]);
        })

        function uploadFile(file) {
            if (!['image/jpeg', 'image/png', 'image/bmp'].includes(file.type)) {
                alert('Разрешены только изображения');
                formImage.value = '';
                return;
            }

            if (file.size > 8 * 1024 * 1024) {
                alert('Файл превышает 8 МБ');
                return;
            }

            let reader = new FileReader();
            reader.onload = function (e) {

                imagePreview.innerHTML = `<img src="${e.target.result}" alt="photo">`;
            };
            reader.onerror = function (e) {
                alert('Ошибка');
            };
            reader.readAsDataURL(file);
        }
    }

    else {
        form.classList.toggle('shown');

    }

})
