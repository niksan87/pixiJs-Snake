import {
    GameApplication,
    Utils
} from '../../imports';

export class BaseModel {
    protected app: GameApplication;
    constructor() {
        this.app = Utils.getApplication();
    }
}
