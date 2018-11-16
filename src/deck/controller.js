import { saveDeck, deleteDeck } from '../helpers';
import Model from './model';
import View from './view';



class DeckController {
    constructor(deckParams) {
        this.model = new Model(deckParams || undefined);
        this.model.on('change', state => {
            saveDeck(state);
        });
        this.view = new View(deckParams);
        this.view.on('add', this.addTodo.bind(this));
        this.view.on('edit', this.editTodo.bind(this));
        this.view.on('remove', this.removeTodo.bind(this));
        this.view.on('deleteDeck', this.deleteDeck.bind(this));
        this.view.on('changeList', this.changeList.bind(this));
        this.view.show(this.model.items);
    }

    addTodo(title) {
        const item = this.model.addItem({
            id: Date.now(),
            title
        });

        this.view.addItem(item);
    }


    deleteDeck() {
        if ( confirm('Точно удалить?')) {
        deleteDeck(this.model.id);
        window.location.reload();
        }
    }

    
    editTodo({ id, title }) {
        const item = this.model.updateItem(id, { title });

        this.view.editItem(item);
    }

    removeTodo(id) {
        this.model.removeItem(id);
        this.view.removeItem(id);
    }

    changeList(list) {
        this.model.changeList(list);
        
    }
}

export default DeckController;