import {
    GameApplication,
    BaseModel,
    Constants
} from '../../imports';

export class BaseView extends PIXI.Container {
    public app: GameApplication;
    private _model: BaseModel;

    constructor(model?: BaseModel) {
        super();
        this.model = model;
        this.app = (window[Constants.AppName] as GameApplication);

    }

    public addTo(parent: PIXI.Container | BaseView): void {
        parent.addChild(this);
    }

    public remove(): void {
        this.parent.removeChild(this);
    }

    get model(): BaseModel {
        return this._model;
    }

    set model(model: BaseModel) {
        this._model = model;
    }
}