import {
    BaseModule,
    LoaderModel,
    LoaderView,
    LoaderController
} from '../imports';

export class LoaderModule extends BaseModule {

    public addBindings(): void {
        this
        .asModel(LoaderModel)
        .asView(LoaderView)
        .asController(LoaderController)
        .bind();
    }

}