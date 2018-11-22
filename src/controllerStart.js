import ModelStart from "./modelStart";
import ViewStart from "./viewStart";
import { EventEmitter, load} from './helpers';

class ControllerStart extends EventEmitter{
    constructor() {
        super();

        this.model = new ModelStart();
        this.view = new ViewStart();

        this.view.on('start', this.start.bind(this));
        this.view.on('enter', this.enter.bind(this));
    }

    start({login, password}) {
        const user = this.model.start(login, password);
        this.emit('changeUser', user);
    }

    enter({login, password}) {
        load(login);
        const user = this.model.enter(login, password);
        this.emit('changeUser', user);
    }

}

export default ControllerStart;