import { EventEmitter, createElement } from './helpers';


class View extends EventEmitter {
    constructor() {
        super();
        
        this.button = this.createAddButton();
    }

    createAddButton() {
        const decks = createElement('div', {id: 'decks',className: 'decks'});
        const header = createElement('header', {id: 'header'});
        const addButton = createElement('button', {className: 'add-deck-btn'}, 'Создать колонку');        
        const saveButton = createElement('button', {className: 's'}, 'Сохранить изменения');           
        const logOutButton = createElement('button', {className: 's'}, 'Выйти');

        const page = document.getElementById('page');

        addButton.addEventListener('click', () => {this.emit('addDeck')} );
        saveButton.addEventListener('click', () => {this.emit('saveDecks')} );
        logOutButton.addEventListener('click', () => {this.emit('logOut')} );

        header.appendChild(saveButton);        
        header.appendChild(logOutButton);
        decks.appendChild(addButton);
        page.appendChild(header);
        page.appendChild(decks);
    }
}

export default View;