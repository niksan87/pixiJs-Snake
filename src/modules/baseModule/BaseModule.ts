import {
    BaseModel,
    BaseView,
    BaseController,
    IConstructable
} from '../imports';

export abstract class BaseModule {
    protected model: BaseModel;
    protected view: BaseView;
    protected controller: BaseController;

    constructor() {
        this.addBindings();
    }

    public abstract addBindings(): void 

    public asModel(Model: IConstructable<BaseModel>): BaseModule {
        if (!this.model) {
            this.model = new Model();
        }
        return this;
    }

    public asView(View: IConstructable<BaseView>): BaseModule {
        if (!this.view) {
            this.view = new View();
        }
        return this;
    }

    public asController(Controller: IConstructable<BaseController>): BaseModule {
        if (!this.controller) {
            this.controller = new Controller();
        }
        return this;
    }

    public bind(): void {
        if (this.model && this.view && !this.view.model) {
            this.view.model = this.model;
        }

        if (this.model && this.controller && !this.controller.model) {
            this.controller.model = this.model;
        }

        if (this.view && this.controller && !this.controller.view) {
            this.controller.view = this.view;
        }
    }

}
