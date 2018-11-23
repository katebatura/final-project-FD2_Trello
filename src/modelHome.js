import { EventEmitter } from './helpers';
import { saveHome, load, saveAjax, saveDeck } from './helpers';

class ModelHome extends EventEmitter {
    constructor(user) {
        super();
        this.user = user;
        this.Homedecks = load('home_' + user) || [];
        
    }

    addDeck() {
        console.log(this.Homedecks);
        const lastDeck = this.Homedecks[this.Homedecks.length - 1];
        const DeckNumber = lastDeck ? +lastDeck.id.slice(4) : 0;
        console.log(DeckNumber);
        const newDeck = {
            id: `Home${DeckNumber + 1}`,
            title: `Доска ${DeckNumber + 1}`
        };
        this.Homedecks.push(newDeck);
        this.emit('change', newDeck);
        saveHome(this.Homedecks,'home_' + this.user);
        saveAjax(this.Homedecks,'home_' + this.user);
    }

    saveDeck(deckParams) {
        saveDeck(deckParams, 'home_' + this.user);
        this.Homedecks = load('home_' + this.user) || [];
        saveAjax(this.Homedecks,'home_' + this.user);
    }


}

export default ModelHome;