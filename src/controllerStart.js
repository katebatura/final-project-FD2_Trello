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
        let route = this.model.enter(login, password);
        this.emit('changeHash', route)
    }

}

export default ControllerStart;