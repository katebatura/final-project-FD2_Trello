import { EventEmitter, createElement } from './helpers';


class View extends EventEmitter {
    constructor() {
        super();
        
        this.button = this.createAddButton();
    }

    createAddButton() {
        const addButton = createElement('button', {className: 'add'}, 'Создать колонку');
        const body = document.getElementsByTagName('body')[0];
        const script = body.getElementsByTagName('script')[0];

        addButton.addEventListener('click', () => {this.emit('addDeck')} );

        body.insertBefore(addButton,script);
    }
}

export default View;