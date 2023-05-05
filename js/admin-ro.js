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
                Autentificare la panoul de administrare
            </h2>
            </legend>
            <div class="form-item">
            <label for="login" class="form-label"> Întrați-vă login-ul </label>
            <input id="login" type="text" class="form-input form-auth-inp">
            </div>
            <div class="form-item">
            <label for="password" class="form-label"> Întrați-vă parola </label>
            <input id="password" type="password" class="form-input form-auth-inp">
            </div>
            <div class="form-brn-container">
            <button class="form-button form-auth-btn"> Întrare </button>
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
                        Logare cu succes!
                    </span>
                    `;
                        localStorage.setItem('token', "true");
                        setTimeout(renderTable, 1000);

                    }
                    else {
                        msg.innerHTML = `
                    <span class="wrong-msg">
                        Login-ul sau parola întrodus incorect!
                    </span>
                    `;
                    }
                })
            }
        }, 1000)
    }
    function renderTable() {
        container.innerHTML = `
        <div class="back-div"><a class="back" href="../index.html">Pagina Principală</a> <a class="back logout" href="admin-ro.html">Ieși panoul de administrare</a></div>
        
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
                    <th>Client</th>
                    <th>Telefon</th>
                    <th>E-mail</th>
                    <th>Comment</th>
                    <th>Comandat</th>
                    <th>Social Medie</th>
                    <th>Livrare?</th>
                    <th>Imagini</th>
                    <th>Total</th>
                    <th>Funcție</th>
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
                <td> <button class="buttons" id="`+ data[i]['id'] + `"> șterge </button> </td>
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
                                    <span class="wrong-msg-access"> Comanda numărul `+ el.id +` a fost ștearsă cu succes! </span>
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
