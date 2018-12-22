import {
    GameApplication,
    BaseModel,
    BaseView,
    Utils
} from '../../imports';

export abstract class BaseController {
    private _view: BaseView;
    private _model: BaseModel;

    constructor() {
        this.addListeners();
    }

    get view(): BaseView {
        return this._view;
    }

    set view(view: BaseView) {
        this._view = view;
    }

    get model(): BaseModel {
        return this._model;
    }

    set model(model: BaseModel) {
        this._model = model;
    }

    protected abstract addListeners(): void;
}