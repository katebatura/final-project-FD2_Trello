import DeckController from "./deck/controller";
import Model from "./model";
import View from "./view";
import Router from "./Router";

class Controller {
    constructor(user,deckId) {
        this.user = user;   
        this.name =  user + deckId;    

        let promise = new Promise((resolve,reject) => {            
             this.model = new Model(this.name,this.user);
             resolve();
        })
        promise.then(()=>{
            this.view = new View(this.user);
            this.view.on('addDeck', this.addDeck.bind(this));        
            this.view.on('saveDecks', this.saveDecks.bind(this));             
            this.view.on('logOut', this.logOut.bind(this));             
            this.view.on('home', this.home.bind(this));
            this.model.on('change', state => {
                new DeckController(state,this.name);
            });
    
            this.model.decks.forEach(deck => new DeckController(deck,this.name));
        })
    }

    addDeck() {
        this.model.addDeck();
    }

    saveDecks() {
        this.model.saveDecks();
    }

    logOut() {
        var compare = this.model.compareInfo();
        if(!compare) {
            if(!confirm('Есть несохраненные изменения. Вы уверены, что хотите выйти?')) {
                return
            }
        };
        this.model.canselChanges();
        localStorage.removeItem('user');
        new Router().navigateTo('start');
    }

    home() {
        var compare = this.model.compareInfo();
        if(!compare) {
            if(!confirm('Есть несохраненные изменения. Вы уверены, что хотите выйти?')) {
                return
            }
        };
        this.model.canselChanges();
        new Router().navigateTo('home');
    }

}
export default Controller;