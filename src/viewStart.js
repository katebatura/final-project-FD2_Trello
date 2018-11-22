import { EventEmitter, createElement } from './helpers';

class ViewStart extends EventEmitter {
    constructor() {
        super();

        this.form = this.createForm();

    }

    createForm() {
        const login = createElement('input', {type: 'text', className: 'login', placeholder: 'login'});
        const password = createElement('input', {type: 'password', className: 'password', placeholder: 'password'});
        const registrate = createElement('input', {type: 'submit', className: 'start', value: 'Зарегистрироваться'});
        const enter = createElement('input', {type: 'submit', className: 'start', value: 'Войти'});
        const form = createElement('form', {}, login, password, registrate, enter );
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

        this.emit( 'enter', {login, password} );

    }

}

export default ViewStart;