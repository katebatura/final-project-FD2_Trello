import DeckController from "./deck/controller";
import Model from "./model";
import View from "./view";
import Router from "./Router";

class Controller {
    constructor(user) {
        this.user = user;        

        let promise = new Promise((resolve,reject) => {            
             this.model = new Model(this.user);
             resolve();
        })
        promise.then(()=>{
            this.view = new View();
            this.view.on('addDeck', this.addDeck.bind(this));        
            this.view.on('saveDecks', this.saveDecks.bind(this));             
            this.view.on('logOut', this.logOut.bind(this));
            this.model.on('change', state => {
                new DeckController(state,this.user);
            });
    
            this.model.decks.forEach(deck => new DeckController(deck,this.user));
        })
    }

    addDeck() {
        this.model.addDeck();
    }

    saveDecks() {
        this.model.saveDecks();
    }

    logOut() {
        localStorage.setItem('user', null);
        new Router().navigateTo('start');
    }

}
export default Controller;