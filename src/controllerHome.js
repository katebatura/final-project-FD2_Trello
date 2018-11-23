import { saveDeck, deleteDeck, changeDeckList } from './helpers';
import ModelHome from "./modelHome";
import ViewHome from "./viewHome";
import Router from "./Router";

class ControllerHome {
    constructor(user) {
        this.user = user;        

        let promise = new Promise((resolve,reject) => {            
             this.model = new ModelHome(this.user);
             resolve();
        })
        promise.then(()=>{
            this.view = new ViewHome(this.user);
            this.view.on('addDeck', this.addDeck.bind(this));                
            this.view.on('logOut', this.logOut.bind(this));            
            this.view.on('enterDeck', this.enterDeck.bind(this));             
            this.view.on('renameDeck', this.renameDeck.bind(this));            
            this.view.on('delete', this.delete.bind(this));
            this.model.on('change', this.addDeckHome.bind(this));
            this.model.Homedecks.forEach(deck => this.addDeckHome(deck));
        })
    }

    addDeck() {
        this.model.addDeck();
    }

    addDeckHome(newDeck) {
        this.view.addDeckHome(newDeck);
    }

    logOut() {
        new Router().navigateTo('start');
    }

    enterDeck(id) {
        new Router(id).navigateTo('decks');
    }

    delete({id,user}) {        
        if ( confirm('Точно удалить?')) {
            deleteDeck(id,user);
            setTimeout(() => {this.model.saveDeck({id,user})},0);
            setTimeout(() => {window.location.reload()},1000);
        }
    }

    renameDeck(deckParams) {
        this.model.saveDeck(deckParams);
    }

}
export default ControllerHome;