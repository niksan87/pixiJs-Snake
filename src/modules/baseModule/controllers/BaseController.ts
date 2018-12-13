import {
    BaseModel,
    BaseView
} from '../../imports';

export class BaseController {
    private _model: BaseModel;
    private _view: BaseView;

    constructor() {

    }

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