import ModelStart from "./modelStart";
import ViewStart from "./viewStart";

class ControllerStart {
    constructor() {
        this.model = new ModelStart();
        this.view = new ViewStart();
    }
}

export default ControllerStart;