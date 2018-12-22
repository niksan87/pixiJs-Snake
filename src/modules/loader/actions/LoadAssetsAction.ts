import {
    BaseAction,
    LoaderConstants,
    EventsManager
} from '../../imports';

export class LoadAssetsAction extends BaseAction {
    public execute(): Promise<any> {
        EventsManager.addListener(LoaderConstants.EVENTS.LOADER_RESOLVE, () => this.actionResolve());
        EventsManager.dispatch(LoaderConstants.EVENTS.LOADER_START);
        return super.execute();
    }
}