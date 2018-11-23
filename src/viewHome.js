import { EventEmitter, createElement } from './helpers';


class ViewHome extends EventEmitter {
    constructor(user) {
        super();
        
        this.user = user;
        this.page = this.createPage();     
        this.avatar = document.getElementsByClassName('.avatar')[0];
        
        
    }

    createPage() {
        const decks = createElement('div', {id: 'decks',className: 'decks'});
        const header = createElement('header', {id: 'header'});
        const cabinet = createElement('div', {});
        const avatar = createElement('div', {className: 'avatar'});
        const user = createElement('div', {className: 'user'});
        const addButton = createElement('button', {className: 'add-deck-btn'}, 'Создать доску');     
        const logOutButton = createElement('button', {className: 's'}, 'Выйти');
        
        
        const photo = createElement('input', {type: 'file', className: 'photo', accept:"image"});
        const cancel = createElement('input', {type: 'button', value:'cancel', className: 'cancel'});
        const submit = createElement('input', {type: 'button', value:'send'});
        const form = createElement('form', {method: 'post', enctype: 'multipart/form-data'}, photo,cancel,submit);

        const page = document.getElementById('page');

        user.innerHTML = 'Hi, ' + this.user; 

        addButton.addEventListener('click', () => {this.emit('addDeck')} );
        logOutButton.addEventListener('click', () => {this.emit('logOut')} );
        submit.addEventListener('click', this.addAvatar.bind(this) );
            
        
        cabinet.appendChild(avatar); 
        cabinet.appendChild(form);
        cabinet.appendChild(user);       
        cabinet.appendChild(logOutButton);
 
        header.appendChild(cabinet); 

        decks.appendChild(addButton);
        page.appendChild(header);
        page.appendChild(decks);

        $( '.avatar' ).dblclick(function(e) {
            $(this).next('form').show();
        });

        $( 'form' ).hide();
            
        $( '.cancel' )   
            .click(function(e) {
                $(this).parent().hide();
            });
        
            
    }
    
    addDeckHome(deckParams) {
        
        const h1 = createElement('h1', {}, deckParams.title);
        const renameInput = createElement('input', {type: 'text', className: 'renameInput'});
        const enterButton = createElement('button', {className: 'enterButton'}, 'Войти');
        const delButton = createElement('button', {className: 'delButton'}, 'Удалить доску');
        const main = createElement('main', {'data-id': deckParams.id}, h1, renameInput, enterButton, delButton);
        const page = document.getElementById('decks');

        page.appendChild(main);

        renameInput.addEventListener('keypress', this.renameDeck.bind(this));
        delButton.addEventListener('click', this.deleteDeckHome.bind(this) );
        enterButton.addEventListener('click', this.enterMain.bind(this) );

        //переименование доски
        $( 'h1', main ).click(function(e) {
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

    deleteDeckHome(e) {
        const id = e.currentTarget.parentNode.getAttribute('data-id');
        var user = 'home_' + this.user;
        this.emit('delete',{id,user})
    }

    renameDeck(e) {
        if(e.keyCode == 13){
            const text = $('.renameInput', this.main).val();
            $('.renameInput', this.main).hide().prev('h1').text(text).show(); 
            const id = e.currentTarget.parentNode.getAttribute('data-id');           
            const title = text;
            let deckParams = {id, title}
            this.emit('renameDeck', deckParams)
        }
    }
    enterMain(e) {
        const id = e.currentTarget.getAttribute('data-id'); 
        console.log(id);
        this.emit('enterDeck', id);
    }

    addAvatar() {
        var inputFile = document.getElementsByClassName('photo')[0].files;
        if(!inputFile) return;
        alert(inputFile);
        var fileName = inputFile[0].name;
        this.avatar.css.backgroundImage = fileName;
    }
}

export default ViewHome;