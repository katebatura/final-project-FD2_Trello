import { EventEmitter, createElement } from './helpers';


class View extends EventEmitter {
    constructor(user) {
        super();
        
        this.user = user;
        this.button = this.createAddButton();
    }

    createAddButton() {
        const decks = createElement('div', {id: 'decks',className: 'decks'});
        const header = createElement('header', {id: 'header'});
        const user = createElement('div', {className: 'user'});
        const addButton = createElement('button', {className: 'add-deck-btn'}, 'Создать колонку');        
        const saveButton = createElement('button', {className: 'ss'}, 'Сохранить изменения');         
        const home = createElement('button', {className: 'ss'}, 'На главную');                
        const logOutButton = createElement('button', {className: 's'}, 'Выйти');

        const cabinet = createElement('div', {className: 'main-cabinet-wrap'}, user, logOutButton);
        
        const page = document.getElementById('page');

        user.innerHTML = 'Добро пожаловать, ' + this.user; 

        addButton.addEventListener('click', () => {this.emit('addDeck')} );
        saveButton.addEventListener('click', () => {this.emit('saveDecks')} );
        home.addEventListener('click', () => {this.emit('home')} );
        logOutButton.addEventListener('click', () => {this.emit('logOut')} );

        header.appendChild(saveButton); 
        header.appendChild(home); 
        header.appendChild(cabinet); 

        decks.appendChild(addButton);
        page.appendChild(header);
        page.appendChild(decks);
    }
}

export default View;