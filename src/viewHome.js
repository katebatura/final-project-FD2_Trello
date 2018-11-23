import { EventEmitter, createElement } from './helpers';


class ViewHome extends EventEmitter {
    constructor(user) {
        super();
        
        this.user = user;
        this.page = this.createPage();       
        
    }

    createPage() {
        const decks = createElement('div', {id: 'decks',className: 'decks'});
        const header = createElement('header', {className: 'home-header', id: 'header'});
        const user = createElement('div', {className: 'user'});
        const addButton = createElement('button', {className: 'add-deck-btn'}, 'Создать доску');     
        const logOutButton = createElement('button', {className: 's'}, 'Выйти');
        const cabinet = createElement('div', {className: 'main-cabinet-wrap'}, user, logOutButton);

        const page = document.getElementById('page');

        user.innerHTML = 'Добро пожаловать, ' + this.user; 

        addButton.addEventListener('click', () => {this.emit('addDeck')} );
        logOutButton.addEventListener('click', () => {this.emit('logOut')} );
             
        header.appendChild(cabinet); 

        decks.appendChild(addButton);
        page.appendChild(header);
        page.appendChild(decks);

            
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
        const headWrap = createElement('div', {'data-id': deckParams.id, className: 'head-wrap'}, h1, delButton);

        const main = createElement('main', {'data-id': deckParams.id, className: 'home-deck'}, headWrap, renameInput, enterButton);
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
        const id = e.currentTarget.parentNode.getAttribute('data-id'); 
        console.log(id);
        this.emit('enterDeck', id);
    }

    sendAvatar() {
    }
}

export default ViewHome;