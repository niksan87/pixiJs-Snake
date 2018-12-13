import {
    BaseModel
} from '../../imports';

export class BaseView {
    private _model: BaseModel;

    constructor(model?: BaseModel) {
        this.model = model;
    }

    get model(): BaseModel {
        return this._model;
    }

    set model(model: BaseModel) {
        this._model = model;
    }
}