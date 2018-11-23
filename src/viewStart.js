import { EventEmitter, createElement } from './helpers';

class ViewStart extends EventEmitter {
    constructor() {
        super();

        this.form = this.createForm();

    }

    createForm() {
        const h1 = createElement('h1', {className: 'head'}, 'ToDo');

        const login = createElement('input', {type: 'text', name: 'login', className: 'login', placeholder: 'Login'});
        const loginErr = createElement('span', {id: 'logerr', className: 'err'});
        const loginWrap = createElement('div', {className: 'login-wrap'}, login, loginErr);

        const password = createElement('input', {type: 'password', name: 'password', className: 'password', placeholder: 'Password'});
        const passworErr = createElement('span', {id: 'passerr', className: 'err'});
        const passwordWrap = createElement('div', {className: 'password-wrap'}, password, passworErr);

        const registrate = createElement('input', {type: 'submit', className: 'reg', value: 'Зарегистрироваться'});
        const enter = createElement('input', {type: 'submit', className: 'start', value: 'Войти'});
        const form = createElement('form', {className: 'reg-form'}, h1, loginWrap, passwordWrap, enter, registrate);
        const page = document.getElementById('page');

        registrate.addEventListener('click', this.start.bind(this));
        enter.addEventListener('click', this.enter.bind(this));

        page.appendChild(form);

    }

    start(e) {
        e.preventDefault();
        const login = document.querySelector('.login').value;
        const password = document.querySelector('.password').value;

        this.emit( 'start', {login, password} );
    }

    enter(e){
        e.preventDefault();
        const login = document.querySelector('.login').value;
        const password = document.querySelector('.password').value;

        const spanLog = document.getElementById('logerr');
        const spanPass = document.getElementById('passerr');


        if(!login) {
            spanLog.innerHTML = 'Поле "логин" не может быть пустым';
        } else if(login.length < 3) {
            spanLog.innerHTML = 'Логин должен быть больше 3 символов';
        } else {
            spanLog.innerHTML = '';
        }

        if(!password) {
            spanPass.innerHTML = 'Поле "пароль" не может быть пустым';
        } else if (password.length < 6) {
            spanPass.innerHTML = 'Пароль должен быть больше 6 символов';
        } else {
            spanPass.innerHTML = '';
            this.emit( 'enter', {login, password} );
        }

    }

}

export default ViewStart;