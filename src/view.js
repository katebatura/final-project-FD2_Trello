import { EventEmitter, createElement } from './helpers';


class View extends EventEmitter {
    constructor() {
        super();
        
        this.button = this.createAddButton();
    }

    createAddButton() {
        const addButton = createElement('button', {className: 'add'}, 'Создать колонку');        
        const saveButton = createElement('button', {className: 'add'}, 'Сохранить изменения');           
        const logOutButton = createElement('button', {className: 'add'}, 'Выйти');

        const page = document.getElementById('page');

        addButton.addEventListener('click', () => {this.emit('addDeck')} );
        saveButton.addEventListener('click', () => {this.emit('saveDecks')} );
        logOutButton.addEventListener('click', () => {this.emit('logOut')} );

        page.appendChild(addButton);
        page.appendChild(saveButton);        
        page.appendChild(logOutButton);
    }
}

export default View;