let info = '';
let container = '';
let token = localStorage.getItem('token');
document.addEventListener('DOMContentLoaded', function () {
    container = document.querySelector(".container");
    if (token == 'true') {
        renderTable();
    }
    else {
        let auth = `
    <div class="forma">
            <form class="form-auth form-body" action="" id="form">
            <legend>
            <h2 class="form-title">
                Вход в административную панель
            </h2>
            </legend>
            <div class="form-item">
            <label for="login" class="form-label"> Введите логин </label>
            <input id="login" type="text" class="form-input form-auth-inp">
            </div>
            <div class="form-item">
            <label for="password" class="form-label"> Введите пароль </label>
            <input id="password" type="password" class="form-input form-auth-inp">
            </div>
            <div class="form-brn-container">
            <button class="form-button form-auth-btn"> Войти </button>
            </div>
            <div class="form-item">
            <label class="form-label wrong"> </label>
            </div>
        </form>
    </div>
    `;
        container.innerHTML = auth;
        setTimeout(function () {
            const form = document.querySelector('.form-auth');
            let msg = document.querySelector('.wrong');
            form.addEventListener('submit', formSend);
            async function formSend(e) {
                e.preventDefault();
                $.getJSON('pass.json', function (data) {
                    let logField = form.querySelector('#login');
                    let passField = form.querySelector('#password');
                    if (logField.value == data[0]['login'] && passField.value == data[0]['password']) {
                        msg.innerHTML = `
                    <span class="wrong-msg-access">
                        Успешный вход!
                    </span>
                    `;
                        localStorage.setItem('token', "true");
                        setTimeout(renderTable, 1000);

                    }
                    else {
                        msg.innerHTML = `
                    <span class="wrong-msg">
                        Логин или пароль введены неверно!
                    </span>
                    `;
                    }
                })
            }
        }, 1000)
    }
    function renderTable() {
        container.innerHTML = `
        <div class="back-div"><a class="back" href="../index-ru.html">На главную</a> <a class="back logout" href="admin-ru.html">Выйти из административной панели</a></div>
        
        <div class="insert-sheet">
            <table class="info-table">
                
            </table>
            <div class="del-msg"> </div>
        </div>
        `;
        setTimeout(() => {
            let toPaste = document.querySelector('.info-table');
            fetch('https://sheetdb.io/api/v1/hg9weq2r5wyo3', {
                method: 'GET',
                headers: { 'Authorization': 'Bearer 2c7dwucsmcbkk6wy589k8vtbkzo7sxv1mzkhmej2' }
            })
                .then((response) => response.json())
                .then((data) => {
                    let toHtml = `
            <tr class="titles">
                    <th>Id</th>
                    <th>Клиент</th>
                    <th>Телефон</th>
                    <th>E-mail</th>
                    <th>Комментарий</th>
                    <th>Заказано</th>
                    <th>Соц-сети</th>
                    <th>Доставка?</th>
                    <th>Изображения</th>
                    <th>Всего</th>
                    <th>Функция</th>
                </tr>
                `;
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        let id = i + 1;
                        let layout = `
                <tr class="Descr">
    
                <td> `+ data[i]['id'] + ` </td>
                <td> `+ data[i]['client'] + ` </td>
                <td> `+ data[i]['number'] + ` </td>
                <td> `+ data[i]['email'] + ` </td>
                <td> `+ data[i]['comment'] + ` </td>
                <td> `+ data[i]['whatOrdered'] + ` </td>
                <td> `+ data[i]['social'] + ` </td>
                <td> `+ data[i]['delivery?'] + ` </td>
                <td> `+ data[i]['photo'] + ` </td>
                <td> `+ data[i]['total'] + ` </td>
                <td> <button class="buttons" id="`+ data[i]['id'] + `"> удалить </button> </td>
                </tr>`;
                        toHtml += layout;
                    };
    
    
                    toPaste.innerHTML = toHtml;
                    console.log(toHtml);
                });
    
            setTimeout(function () {
                $('.logout').click(() =>{
                    localStorage.setItem('token', "false");
                });
                
                let buttons = document.querySelectorAll('.buttons');
                buttons.forEach((el) => {
                    el.addEventListener('click', function () {
                        let href = "https://sheetdb.io/api/v1/hg9weq2r5wyo3/id/" + el.id;
                        fetch(href, {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer 2c7dwucsmcbkk6wy589k8vtbkzo7sxv1mzkhmej2'
                            }
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                let delMess = `
                                    <span class="wrong-msg-access"> Заказ номер `+ el.id +` был успешно удалён! </span>
                                `;
                                $('.del-msg').html(delMess); 
                                setTimeout(() => {
                                    renderTable();
                                }, 1500); 
                            });
                    })
                })
            }, 2000)
        }, 500);
    
    }
})
