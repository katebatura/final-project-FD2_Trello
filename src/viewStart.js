import { EventEmitter, createElement } from './helpers';

class ViewStart extends EventEmitter {
    constructor() {
        super();

        this.form = this.createForm();

    }

    createForm() {
        const login = createElement('input', {type: 'text', className: 'login', placeholder: 'login'});
        const password = createElement('input', {type: 'password', className: 'password', placeholder: 'password'});
        const start = createElement('input', {type: 'submit', className: 'start', value: 'start'});
        const form = createElement('form', {}, login, password, start );
        const page = document.getElementById('page');

        form.addEventListener('submit', this.start.bind(this));

        page.appendChild(form);
    }

    start(e) {
        e.preventDefault();
    }

}

export default ViewStart;