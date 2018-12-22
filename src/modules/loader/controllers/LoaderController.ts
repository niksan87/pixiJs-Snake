import {
    BaseController,
    EventsManager,
    LoaderConstants,
    LoaderModel,
    LoaderView,
    Constants,
    Utils,
    GameApplication
} from '../../imports';

export class LoaderController extends BaseController {
    public view: LoaderView;
    public model: LoaderModel;

    protected addListeners(): void {

        EventsManager.addListener(LoaderConstants.EVENTS.LOADER_START, () => {
            this.view.addTo(GameApplication.app.stage);
            this.model.loadAssets();
        });

        EventsManager.addListener(LoaderConstants.EVENTS.LOADER_IN_PROGRESS, (event: CustomEvent) => {
            this.view.animateLoading(event.detail);
        });

        EventsManager.addListener(LoaderConstants.EVENTS.LOADER_COMPLETE, () => {
            this.view.animateOutro().then(() => {}); //this.view.remove()
        });
    }
}