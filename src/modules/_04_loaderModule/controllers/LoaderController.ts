import {
    GameApplication,
    BaseController,
    EventsManager,
    LoaderModel,
    LoaderView,
    LoaderConstants,
    GameConstants,
    Constants,
} from '../../imports';

export class LoaderController extends BaseController {
    public view: LoaderView;
    public model: LoaderModel;

    protected addListeners(): void {

        EventsManager.addListener(LoaderConstants.EVENTS.LOAD_ASSETS_ACTION_START, () => {
            EventsManager.dispatch(LoaderConstants.EVENTS.LOADER_ADD);
            EventsManager.dispatch(LoaderConstants.EVENTS.LOADER_START);
        });

        EventsManager.addListener(LoaderConstants.EVENTS.LOADER_ADD, () => {
            this.view.addTo(GameApplication.app.stage);
        });

        EventsManager.addListener(LoaderConstants.EVENTS.LOADER_START, () => {
            this.model.loadAssets();
        });

        EventsManager.addListener(LoaderConstants.EVENTS.LOADER_IN_PROGRESS, (event: CustomEvent) => {
            this.view.animateLoading(event.detail);
        });

        EventsManager.addListener(LoaderConstants.EVENTS.LOADER_COMPLETE, () => {
            EventsManager.dispatch(LoaderConstants.EVENTS.LOADER_PLAY_OUTRO);
            EventsManager.dispatch('START_NEXT_ACTION');
        });

        EventsManager.addListener(LoaderConstants.EVENTS.LOADER_PLAY_OUTRO, () => {
            this.view.animateOutro().then(() => {
                EventsManager.dispatch(LoaderConstants.EVENTS.LOADER_REMOVE);
                EventsManager.dispatch(LoaderConstants.EVENTS.LOAD_ASSETS_ACTION_FINISH);
                EventsManager.dispatch(GameConstants.EVENTS.GAME_ENABLE_FUNCTIONALITY);
            });
        });

        EventsManager.addListener(LoaderConstants.EVENTS.LOADER_REMOVE, () => {
            this.view.remove();
        });
    }
}