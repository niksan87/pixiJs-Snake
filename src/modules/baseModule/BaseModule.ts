import {
    BaseModel,
    BaseView,
    BaseController,
    IConstructable
} from '../imports';

export abstract class BaseModule {
    private _model: BaseModel;
    private _view: BaseView;
    private _controller: BaseController;

    constructor() {
        this.addBindings();
    }

    public asModel(Model: IConstructable<BaseModel>): BaseModule {
        if (!this._model) {
            this._model = new Model();
        }
        return this;
    }

    public asView(View: IConstructable<BaseView>): BaseModule {
        if (!this._view) {
            this._view = new View();
        }
        return this;
    }

    public asController(Controller: IConstructable<BaseController>): BaseModule {
        if (!this._controller) {
            this._controller = new Controller();
        }
        return this;
    }

    public bind(): void {
        if (this._view && this._controller && !this._controller.view) {
            this._controller.view = this._view;
        }
        if (this._model && this._controller && !this._controller.model) {
            this._controller.model = this._model;
        }
    }

    get view(): BaseView {
        return this._view;
    }

    public abstract addBindings(): void 

}
