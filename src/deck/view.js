 import { EventEmitter, createElement } from '../helpers';

class DeckView extends EventEmitter {
    constructor(deckParams) {
        super();

        this.main = this.createDeck(deckParams); //создание колонки
        this.form = this.main.getElementsByTagName('form')[0];
        this.input = this.main.getElementsByClassName('input')[0];
        this.list = this.main.getElementsByClassName('todo-list')[0];
        this.delButton = this.main.getElementsByClassName('delButton')[0];
        this.editingItem = null;
        this.editingButton = null;
        this.id = deckParams.id;
        this.title = deckParams.title;
        this.lines = deckParams.lines;

        this.form.addEventListener('submit', this.handleAdd.bind(this));
        this.delButton.addEventListener('click', this.handleDeleteDeck.bind(this));
        this.main.querySelector('.renameInput').addEventListener('keypress', this.renameDeck.bind(this));
        
        this.btnShowFormAdd = this.main.getElementsByClassName('show-form-add')[0];
        this.btnShowFormAdd.addEventListener('click', this.handleShowFormAddTodo.bind(this));

        //сортировка колонок
        $( document.body ).sortable({
            items: "main",
            update: this.changeDeckList.bind(this)
        });

    }

    createDeck(deckParams) {
        const h1 = createElement('h1', {}, deckParams.title);
        const renameInput = createElement('input', {type: 'text', className: 'renameInput'});
        const delButton = createElement('button', {className: 'delButton'}, 'Удалить колонку');
        const header = createElement('header', {}, h1, renameInput, delButton);
        const ul = createElement('div', {className: 'todo-list'});
        const input = createElement('input', {type: 'text', className: 'input'});
        const submit = createElement('input', {type: 'submit', className: 'button', value: 'Добавить'});
        const form = createElement('form', {}, input, submit );
        const btnShowFormAdd = createElement('button', {className: 'show-form-add'}, 'Добавить еще одну карточку');
        const main = createElement('main', { 'data-id': deckParams.id }, header, ul, form, btnShowFormAdd);
        const page = document.getElementById('decks');

        page.appendChild(main);

        //сортировка ToDo в колонке
        $( ".todo-list", main ).sortable({
            connectWith: '.todo-list',
            update: this.updateList.bind(this)
        });

        //переименование колонки
        $( 'h1', main ).dblclick(function(e) {
            const text = $(this).text();
            $(this).hide().next('input').val(text).show().focus();
        });
        $('.renameInput', main)
            .hide()
            .blur(function(e) {
                $(this).hide().prev('h1').show();
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

    renameDeck(e) {
        if(e.keyCode == 13){
            const text = $('.renameInput', this.main).val();
            $('.renameInput', this.main).hide().prev('h1').text(text).show();            
            this.title = text;
            let deckParams = {id: this.id, title: this.title, lines: this.lines}
            this.emit('renameDeck', deckParams)
        }
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

    //btn show add Todo
    handleShowFormAddTodo({ target }) {
        const listItem = target.parentNode;
        const form = listItem.getElementsByTagName('form')[0];
        form.classList.toggle('show-form');

        if(form.className !== "") {
            target.innerHTML = "";
            target.className = "show-form-add_open"
        } else {
            target.innerHTML = "Добавить еще одну карточку";
            target.className = "show-form-add"
        }
    }

    //при нажатии на кнопку edit для ToDo
    handleEdit({ target }) {
        const listItem = target.parentNode;
        const id = listItem.getAttribute('data-id');
        const label = listItem.querySelector('.title');
        const input = listItem.querySelector('.textfield');
        const editButton = listItem.querySelector('button.edit');
        this.editingButton = editButton;
        const title = input.value;
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            this.emit('edit', { id, title });
        } else {
            input.value = label.textContent;
            editButton.classList.toggle('save');
            listItem.classList.add('editing');
            input.focus();            
            this.editingItem = listItem;

            //добавляем обработчики событий, чтобы изменения сохранялись при нажатии Enter 
            //или любой точки экрана вне input
            input.addEventListener('keypress', this.startEditingWithEnter.bind(this));   
            window.addEventListener('mousedown', this.startEditingWithClick.bind(this));     
        }  
    }

    startEditingWithEnter(e) {
        const listItem = e.target.parentNode;
        const id = listItem.getAttribute('data-id');
        const input = listItem.querySelector('.textfield');
        const title = input.value;
        if( e.keyCode == 13 ) {
            this.emit('edit', { id, title });
        }
    }

    startEditingWithClick(e) {
        if(e.target != this.editingButton) {
            const id = this.editingItem.getAttribute('data-id');
            const input = this.editingItem.querySelector('.textfield');
            const title = input.value;
            const isEditing = this.editingItem.classList.contains('editing');
            if (isEditing) {
                this.emit('edit', { id, title });
            }   
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
        input.removeEventListener('keypress', this.startEditingWithEnter.bind(this)); 
        window.removeEventListener('mousedown', this.startEditingWithClick.bind(this)); 
    }

    removeItem(id) {
        const listItem = this.findListItem(id);

        this.list.removeChild(listItem);
    }
    

    updateList(e,ui) {
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

    //функция, срабатывающая при перетаскивании колонок
    changeDeckList(e,ui) {
        var DeckList = []; //создаем массив с новым порядком колонок в нем
        //для каждой колонки возвращаем хэш с параметрами id,title,lines
        ui.item.parent().children().filter('main').each((item,html) => {
           let id = html.getAttribute('data-id');
           let title = html.querySelector('h1').textContent;
           let lines = [];//массив из ToDo-списка для этой колонки
           let list = html.querySelectorAll('.todo-item');
           if(list) {
            //для каждого ToDo возвращаем хэш с параметрами id,title
            list.forEach( item => {
                    let id = item.getAttribute('data-id');
                    let title = item.textContent;
                    lines.push({id,title});
                });
            }
            DeckList.push({id,title,lines})
        });
        this.emit('changeDeckList', DeckList);
    }

}

export default DeckView;