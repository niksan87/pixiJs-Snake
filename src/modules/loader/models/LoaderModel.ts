import {
    Constants,
    BaseModel,
    EventsManager,
    LoaderConstants,
    Utils,
    LoaderModule
} from '../../imports';

export class LoaderModel extends BaseModel {
    constructor() {
        super();
    }

    public loadAssets(): void {
        const loader: PIXI.loaders.Loader = new PIXI.loaders.Loader();
        const numOfAssets: number = Utils.getObjectLenght(Constants.Assets.Images.Names);
        const progressStep: number = 1 / numOfAssets;
        let progress: number = 0;
        for (var key in Constants.Assets.Images.Names) {
            loader.add(Constants.Assets.Images.Url + Constants.Assets.Images.Names[key]);
        }
        loader.on('progress', () => {
            progress += progressStep;
            EventsManager.dispatch(LoaderConstants.EVENTS.LOADING_IN_PROGRESS, { 'detail': progress });            
        });
        loader.on('complete', () => EventsManager.dispatch(LoaderConstants.EVENTS.LOADING_COMPLETED));
        loader.load();
    }
}