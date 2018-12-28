import {
    GameApplication,
    BaseModel,
    EventsManager,
    Utils,
    LoaderConstants,
    Constants,
} from '../../imports';

export class LoaderModel extends BaseModel {
    private loader: PIXI.loaders.Loader;

    constructor() {
        super();
        this.loader = GameApplication.app.loader;
    }

    public loadAssets(): void {
        const numOfAssets: number = Utils.getObjectLenght(Constants.Assets.Images.Names);
        const progressStep: number = 1 / numOfAssets;
        let progress: number = 0;

        for (var key in Constants.Assets.Images.Names) {
            this.loader.add(Constants.Assets.Images.Url + Constants.Assets.Images.Names[key]);
        }
        this.loader.on('progress', () => {
            progress += progressStep;
            EventsManager.dispatch(LoaderConstants.EVENTS.LOADER_IN_PROGRESS, progress);            
        });
        this.loader.on('complete', () => {
            EventsManager.dispatch(LoaderConstants.EVENTS.LOADER_COMPLETE);
        });
        this.loader.load();
    }
}