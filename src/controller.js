import DeckController from "./deck/controller";
import Model from "./model";
import View from "./view";

class Controller {
    constructor(user) {
        this.user = user;
        this.model = new Model(user);
        this.view = new View();
        this.view.on('addDeck', this.addDeck.bind(this));
        this.model.on('change', state => {
            new DeckController(state,this.user);
        });

        this.model.decks.forEach(deck => new DeckController(deck,this.user));
    }

    addDeck() {
        this.model.addDeck();
    }

}
export default Controller;