import { EventEmitter } from './helpers';
import { save, load, saveAjax } from './helpers';

class Model extends EventEmitter {
    constructor(user) {
        super();
        this.user = user;
        this.decks = load(user) || [];
        this.ajaxDecks = JSON.parse(localStorage.getItem('save')) || [];
        
        console.log(this.ajaxDecks);
        console.log(this.decks);
        console.log(JSON.stringify(this.ajaxDecks) == JSON.stringify(this.decks))
    }

    addDeck() {
        console.log(this.decks);
        const lastDeck = this.decks[this.decks.length - 1];
        const DeckNumber = lastDeck ? +lastDeck.id.slice(3) : 0;
        console.log(DeckNumber);
        const newDeck = {
            id: `app${DeckNumber + 1}`,
            title: `deck ${DeckNumber + 1}`,
            lines:[],
        };
        this.decks.push(newDeck);
        this.emit('change', newDeck);
        save(this.decks,this.user);
    }

    saveDecks() {
        //save(this.decks, this.user);
        this.decks = load(this.user) || [];
        localStorage.setItem('save', JSON.stringify(load(this.user) || []));
        this.ajaxDecks = JSON.parse(localStorage.getItem('save'));
        saveAjax(this.ajaxDecks, this.user);
        console.log(this.ajaxDecks);
        console.log(this.decks);
        console.log(JSON.stringify(this.ajaxDecks) == JSON.stringify(this.decks))
    }

    canselChanges() {
        save(this.ajaxDecks,this.user);
    }
    
    compareInfo() {  
            this.decks = load(this.user) || [];

            if( JSON.stringify(this.ajaxDecks) == JSON.stringify(this.decks)) {
             return true
            } else{
             return false;
            } 
        
     }

}

export default Model;