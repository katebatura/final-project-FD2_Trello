import ModelStart from "./modelStart";
import ViewStart from "./viewStart";
import { EventEmitter} from './helpers';

class ControllerStart extends EventEmitter{
    constructor() {
        super();

        this.model = new ModelStart();
        this.view = new ViewStart();

        this.view.on('start', this.start.bind(this));
        this.view.on('enter', this.enter.bind(this));
    }

    start({login, password}) {
        this.model.start(login, password);
    }

    enter({login, password}) {
        this.model.enter(login, password);
    }

}

export default ControllerStart;