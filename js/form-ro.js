let cart = 0;
let fileCount = 0;
let trigger = true;
let imagesHtml = {};
let imagesJs = [];
let out = '';
let button = '';
let goods = '';
let outerror = 0;
let formData = {};
checkCart();
function checkCart() {

    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

const formImage = document.getElementById('formImage');
const imagePreview = document.getElementById('imagePreview');
const Ordered = document.getElementById('formOrdered');
const NoOrdered = document.getElementById('formNoOrdered');

function getGoods2() {
    goods = JSON.parse(localStorage.getItem('goodslist'));
}

function delImg() {
    out = ``;
    fileCount = 0;
    $('#formImage').val('');
    $(imagePreview).html(out);
    document.querySelector('.delete-img').classList.remove('visible')
    getImages();
}



function getButton() {
    document.querySelector('.delete-img').addEventListener('click', () => {
        delImg();
    });

}


function getImages() {
    imagesHtml = document.querySelectorAll('.delete-img');
}


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
    if (cart != null) {
        form.classList.remove('shown');
        form.addEventListener('submit', formSend);

        // form.addEventListener('submit', formSend);


        async function formSend(e) {
            e.preventDefault();

            let error = formValidate(form);

            if (error == 0) {
                cartQuantity = localStorage.getItem('cartQuantity');
                getGoods2();
                checkCart();
                if (!(goods == undefined) && !(cart == undefined) && !(cartQuantity == undefined)) {
                    cart = null;
                    cartQuantity = 0;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    localStorage.setItem('cartQuantity', JSON.stringify(cartQuantity));
                    localStorage.setItem('sale', false);
                    showMiniCart();
                    let client = form.querySelector('#formName');
                    let numb = form.querySelector('#formNumber');
                    let email = form.querySelector('#formEmail');
                    let commentar = form.querySelector("#formMessage");
                    let boxes = form.querySelectorAll('.social');
                    let social = '';
                    let imgs = '';
                    boxes.forEach((el) => {
                        if (el.checked === true) {
                            social += el.id + ' ';
                        }
                    })
                    imagesJs.forEach((el) => {
                        imgs += el.name + ' ';
                    })
                    let delivery = form.querySelector('#formOrdered');
                    if (delivery.checked == true) {
                        delivery = "true"
                    }
                    else {
                        delivery = "false"
                    }
                    let total = document.querySelector('#total');
                    total = total.innerText;
                    fetch('https://sheetdb.io/api/v1/hg9weq2r5wyo3', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer 2c7dwucsmcbkk6wy589k8vtbkzo7sxv1mzkhmej2',
                            'mode': 'USER_ENTERED'
                        },
                        body: JSON.stringify({
                            data: [
                                {
                                    "id": "INCREMENT",
                                    "client": client.value,
                                    "number": '$' + numb.value,
                                    "email": email.value,
                                    "comment": commentar.value,
                                    "social": social,
                                    "photo": imgs,
                                    "whatOrdered": goods,
                                    "delivery?": delivery,
                                    "total": total
                                }
                            ]
                        })
                    })
                        .then((response) => response.json())
                        .then((data) => console.log(data));
                        setTimeout(() =>{
                            window.location.href = 'thanks-ro.html';
                        }, 2000)

                }
            }
            else {
                alert('Completați câmpurile obligatorii!');
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
                    if (input.getAttribute("type") === 'checkbox' && input.checked === false) {
                        formAddError(input);
                        error++;
                    } else {
                        if (input.classList.contains('form-phone')) {
                            if (phoneTest(input) == 1) {
                                formAddError(input);
                                error++;
                            }
                        }

                        if (input.value == '') {
                            formAddError(input);
                            error++;
                        }
                        else {
                            formRemoveError(input);

                        }

                    }
                }
                if (input.classList.contains('file-input')) {
                    if (fileTest(input)) {
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

        function fileTest(input) {
            if (input.value == '') {
                alert('Atașați imaginea');
                return;
            }
            else {
                formRemoveError(input);
            }
        }

        function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value);
        }

        function phoneTest(input) {
            let lengt = input.value;
            let plus = false; let lbracket = false; let rbracket = false;
            if (lengt.length < 17) {
                for (let i = 0; i < lengt.length; i++) {
                    if (!isNaN(parseFloat(lengt[i])) && isFinite(lengt[i])) {
                        formRemoveError(input);
                        console.log(lengt[i]);
                        outerror = 0;
                    } else {
                        switch (lengt[i]) {
                            case '+': if (plus == false) {
                                plus = true;
                            } else {
                                alert('Numărul este introdus incorect');
                                outerror = 1;
                                return outerror;
                            } break;

                            case '(': if (lbracket == false) {
                                lbracket = true;
                            } else {
                                alert('Numărul este introdus incorect');
                                outerror = 1;
                                return outerror;
                            } break;

                            case ')': if (rbracket == false) {
                                rbracket = true;
                            } else {
                                alert('Numărul este introdus incorect');
                                outerror = 1;
                                return outerror;
                            } break;

                            default:
                                formAddError(input);
                                alert('Numărul este introdus incorect');
                                outerror = 1;
                                return outerror;
                        }
                    }
                }
            }
            else {
                alert('Numărul este introdus incorect');
                outerror = 1;
                return outerror;
            }
        }

        formImage.addEventListener('change', () => {

            if (formImage.files.length > 10) {
                alert('Este interzisă ataşarea mai mult de 10 imagini');
                return;
            }
            else {
                for (let i = 0; i < formImage.files.length; i++) {
                    uploadFile(formImage.files[i]);
                }
            }

        })

        function uploadFile(file) {
            if (!['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/bmp'].includes(file.type)) {
                alert('Sunt permise numai imagini');
                formImage.value = '';
                return;
            }

            if (file.size > 8 * 1024 * 1024) {
                alert('Există o imagine mai mult de 8 MB');
                return;
            }


            let reader = new FileReader();
            reader.onload = function (e) {
                out += `<div><img class='prev-photo' src="${e.target.result}" alt="photo" id="${fileCount}"></div>`;
                $(imagePreview).html(out);
                getButton();
                document.querySelector('.delete-img').classList.add('visible');
                getImages();
                imagesJs[fileCount] = file;
                console.log(imagesJs);
                fileCount++;
            };


            reader.onerror = function (e) {
                alert('Error');
            };
            reader.readAsDataURL(file);
        }
    }

    else {
        form.classList.add('shown');

    }

})

function showMiniCart() {
    let out = '';
    if (cart != null) {
        out = '!';
        spanQuantityBurger.classList.remove('shown');
        spanQuantity.classList.remove('shown');
        spanQuantityBurger.innerHTML = out;
        spanQuantity.innerHTML = out;
    }
    if (cart == null) {
        spanQuantityBurger.classList.add('shown');
        spanQuantity.classList.add('shown');
    }

}