import { EventEmitter, createElement } from '../helpers';

class DeckView extends EventEmitter {
    constructor(deckParams) {
        super();

        this.main = this.createDeck(deckParams);
        this.form = this.main.getElementsByTagName('form')[0];
        this.input = this.main.getElementsByClassName('input')[0];
        this.list = this.main.getElementsByClassName('todo-list')[0];
        this.delButton = this.main.getElementsByClassName('delButton')[0];

        this.form.addEventListener('submit', this.handleAdd.bind(this));
        this.delButton.addEventListener('click', this.handleDeleteDeck.bind(this));
    }

    createDeck(deckParams) {
        const h1 = createElement('h1', {}, deckParams.title);
        const delButton = createElement('button', {className: 'delButton'}, 'Удалить доску');
        const header = createElement('header', {}, h1, delButton);
        const ul = createElement('div', {className: 'todo-list'});
        const input = createElement('input', {type: 'text', className: 'input'});
        const submit = createElement('input', {type: 'submit', className: 'button', value: 'Добавить'});
        const form = createElement('form', {}, input, submit );
        const main = createElement('main', { 'data-id': deckParams.id }, header, ul, form);
        const body = document.getElementsByTagName('body')[0];

        body.appendChild(main);

        $( ".todo-list", main ).sortable({
            connectWith: '.todo-list',
            update: this.updateList.bind(this)
        });
              
        return main;
    }


    createListItem(todo) {
        const label = createElement('label', { className: 'title' }, todo.title);
        const editInput = createElement('input', { type: 'text', className: 'textfield' });
        const editButton = createElement('button', { className: 'edit' });
        const deleteButton = createElement('button', { className: 'remove' });
        const item = createElement('div', { className: 'todo-item', 'data-id': todo.id, draggable: 'true'},
                             label, editInput, editButton, deleteButton);

        return this.addEventListeners(item);
    }

    addEventListeners(item) {
        const editButton = item.querySelector('button.edit');
        const removeButton = item.querySelector('button.remove');
        
        editButton.addEventListener('click', this.handleEdit.bind(this));
        removeButton.addEventListener('click', this.handleRemove.bind(this));

        return item;
    }

    findListItem(id) {
        return this.list.querySelector(`[data-id="${id}"]`);
    }

    handleAdd(event) {
        event.preventDefault();

        if (!this.input.value) return alert('Необходимо ввести название задачи.');

        const value = this.input.value;

        this.emit('add', value);
    }



    handleDeleteDeck() {
        this.emit('deleteDeck');
    }



    handleEdit({ target }) {
        const listItem = target.parentNode;
        const id = listItem.getAttribute('data-id');
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('button.edit');
        const title = input.value;
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            this.emit('edit', { id, title });
        } else {
            input.value = label.textContent;
            editButton.classList.toggle('save');
            listItem.classList.add('editing');
            input.focus();
        }
    }

    handleRemove({ target }) {
        const listItem = target.parentNode;

        this.emit('remove', listItem.getAttribute('data-id'));
    }

    show(todos) {
        todos.forEach(todo => {
            const listItem = this.createListItem(todo);
            this.list.appendChild(listItem);
        });
    }

    addItem(todo) {
        const listItem = this.createListItem(todo);

        this.input.value = '';
        this.list.appendChild(listItem);
    }

    
    editItem(todo) {
        const listItem = this.findListItem(todo.id);
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('button.edit');

        label.textContent = todo.title;
        editButton.classList.toggle('save');
        listItem.classList.remove('editing');
    }

    removeItem(id) {
        const listItem = this.findListItem(id);

        this.list.removeChild(listItem);
    }
    

    updateList(e,ui) {
        // console.log(ui.item);
        // var list = [];
        // ui.item.parent().children().each((item,html) => {
        //         let id = html.getAttribute('data-id');
        //         let title = html.textContent;
            
        //         list.push({id,title});
        // });
        // console.log(list);
        // this.emit('changeList', list);

        var list2 = [];
        console.log(Array.from(this.list.children));
        Array.from(this.list.children).forEach(item => {
            let id = item.getAttribute('data-id');
            let title = item.textContent;

            list2.push({id,title});
        })
        console.log(list2);
        this.emit('changeList', list2);
    }

}

export default DeckView;