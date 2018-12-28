import {
    BaseAction,
    EventsManager,
    LoaderConstants
} from '../../imports';

export class LoadAssetsAction extends BaseAction {
    public execute(): Promise<any> {
        EventsManager.addListener(LoaderConstants.EVENTS.LOADER_FINISH, () => this.actionResolve());
        EventsManager.dispatch(LoaderConstants.EVENTS.LOADER_START);
        return super.execute();
    }
}