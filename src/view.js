import { EventEmitter, createElement } from './helpers';


class View extends EventEmitter {
    constructor() {
        super();
        
        this.button = this.createAddButton();
    }

    createAddButton() {
        const addButton = createElement('button', {className: 'add'}, 'Создать колонку');
        const page = document.getElementById('page');

        addButton.addEventListener('click', () => {this.emit('addDeck')} );

        page.appendChild(addButton);
    }
}

export default View;