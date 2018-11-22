import { EventEmitter } from './helpers';
import { save, load } from './helpers';

class Model extends EventEmitter {
    constructor(user) {
        super();
        this.user = user;
        this.decks = load(this.user) || [];
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
        save(load(this.user),this.user);
    }

}

export default Model;