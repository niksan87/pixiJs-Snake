import {
    BaseAction,
    LoaderConstants,
    EventsManager
} from '../../imports';

export class LoadAssetsAction extends BaseAction {
    public execute(): Promise<any> {
        EventsManager.addListener(LoaderConstants.EVENTS.RESOLVE_LOADING_ACTION, () => this.actionResolve());
        EventsManager.dispatch(LoaderConstants.EVENTS.LOADING_STARTED);
        return super.execute();
    }
}