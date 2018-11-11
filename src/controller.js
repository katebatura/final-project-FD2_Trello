import DeckController from "./deck/controller";
import Model from "./model";
import View from "./view";

class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.button = document.getElementById('add');
        this.button.addEventListener('click', this.addDeck.bind(this));
        this.model.on('change', state => {
            new DeckController(state);
        });

        this.model.decks.forEach(deck => new DeckController(deck));
    }

    addDeck() {
        this.model.addDeck();
    }

}
export default Controller;