import { EventEmitter, createElement } from '../helpers';

class DeckView extends EventEmitter {
    constructor(deckParams) {
        super();

        this.main = this.createDeck(deckParams);
        this.form = this.main.getElementsByTagName('form')[0];
        this.input = this.main.getElementsByClassName('input')[0];
        this.list = this.main.getElementsByClassName('todo-list')[0];
        this.delButton = this.main.getElementsByClassName('delButton')[0];

        this.dragToDo = null;
        this.graggableObject = null;
        this.xy = {};

        this.list.addEventListener('drop', this.listDrop.bind(this));
        this.list.addEventListener('dragover', this.listDragOver.bind(this));

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
        
        item.addEventListener('dragstart',this.handleDragStart.bind(this));
        item.addEventListener('drag',this.handleDrag.bind(this));
        item.addEventListener('dragend',this.handleDragEnd.bind(this));
        
        //item.addEventListener('mousemove', this.handleMouseMove.bind(this));
        //item.addEventListener('mousedown', this.handleMouseDown.bind(this));
        //item.addEventListener('mouseup', this.handleMouseUp.bind(this));

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
    
    handleDragStart(e) {
        this.dragToDo = e.currentTarget;
        
    }

    handleDrag(e) { 
        
    }

    handleDragEnd(e) {
        this.dragToDo = null;
    }

    listDragOver(e) {
        if (e.target.className == "todo-list") {
            e.preventDefault();
         }
    }

    listDrop(e) {
        e.preventDefault;
        if (this.dragToDo) {  
            e.target.appendChild(this.dragToDo);
            
            var items = Array.from(this.list.getElementsByClassName('todo-item'));
            var list = [];
            console.log(items);
            items.forEach(item => {
                let id = item.getAttribute('data-id');
                let title = item.textContent;
            
                list.push({id,title});
            });

            console.log(list);
        }
        this.emit('changeList', list);
    }

    handleMouseDown(e) {
        console.log('hi');
        this.graggableObject = e.target;   
        this.graggableObject.style.cursor = 'pointer';
        var s = this.graggableObject.getBoundingClientRect();
        this.xy.top = s.top; 
        this.xy.left = s.left; 
        this.xy.mtop = e.clientY; 
        this.xy.mleft = e.clientX;
    }
    handleMouseUp(e) {
        this.graggableObject.style.cursor = 'default';
        this.graggableObject = null; 
        this.xy = {};  
      }

    handleMouseMove(e) {
        if (this.graggableObject) {
            console.log('2');
            this.graggableObject.style.cursor = 'pointer';
            this.graggableObject.style.top = parseInt(this.xy.top) + (e.clientY - this.xy.mtop) + 'px';
            this.graggableObject.style.left = parseInt(this.xy.left) + (e.clientX - this.xy.mleft) + 'px';
        }  
    }

}

export default DeckView;