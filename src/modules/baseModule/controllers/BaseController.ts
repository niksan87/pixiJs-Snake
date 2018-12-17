import {
    GameApplication,
    BaseModel,
    BaseView,
    Utils
} from '../../imports';

export abstract class BaseController {
    protected app: GameApplication;
    private _model: BaseModel;
    private _view: BaseView;
    constructor() {
        this.addListeners();
        this.app = Utils.getApplication();
    }

    protected abstract addListeners(): void;

    get model(): BaseModel {
        return this._model;
    }

    set model(model: BaseModel) {
        this._model = model;
    }

    get view(): BaseView {
        return this._view;
    }

    set view(view: BaseView) {
        this._view = view;
    }
}