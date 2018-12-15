import {
    Constants,
    BaseModel,
    EventsManager,
    LoaderConstants
} from '../../imports';

export class LoaderModel extends BaseModel {
    constructor() {
        super();
    }

    public loadAssets(): void {
        const loader: PIXI.loaders.Loader = new PIXI.loaders.Loader();
        const numOfAssets: number = Constants.Assets.Images.length;
        const progressStep: number = 1 / numOfAssets;
        let progress: number = 0;
        loader.add(Constants.Assets.Images);
        loader.on('progress', () => {
            progress += progressStep;
            EventsManager.dispatch(LoaderConstants.EVENTS.LOADING_IN_PROGRESS, { 'detail': progress });            
        });
        loader.on('complete', () => EventsManager.dispatch(LoaderConstants.EVENTS.LOADING_COMPLETED));
        loader.load();
    }
}