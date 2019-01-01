import {
    BaseAction,
    EventsManager,
    LoaderConstants
} from '../../imports';

export class LoadAssetsAction extends BaseAction {
    constructor() {
        super();
        this.startEvent = LoaderConstants.EVENTS.LOAD_ASSETS_ACTION_START;
        this.finishEvent = LoaderConstants.EVENTS.LOAD_ASSETS_ACTION_FINISH;
    }
}