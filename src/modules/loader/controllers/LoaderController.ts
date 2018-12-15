import {
    BaseController,
    EventsManager,
    LoaderConstants,
    LoaderModel,
    LoaderView,
    Constants
} from '../../imports';

export class LoaderController extends BaseController {
    public model: LoaderModel;
    public view: LoaderView;

    protected addListeners(): void {
        EventsManager.addListener(LoaderConstants.EVENTS.LOADING_STARTED, () => {
            this.view.addTo(this.view.app.stage);
            this.model.loadAssets();
        });

        EventsManager.addListener(LoaderConstants.EVENTS.LOADING_COMPLETED, () => {
            setTimeout(() => {
                this.view.loadComplete().then(() => EventsManager.dispatch(LoaderConstants.EVENTS.RESOLVE_LOADING_ACTION));
            }, Constants.Animations.Duration * 1000);
        });

        EventsManager.addListener(LoaderConstants.EVENTS.LOADING_IN_PROGRESS, (event: CustomEvent) => {
            this.view.animateLoaderBar(event.detail);
        });
    }
}