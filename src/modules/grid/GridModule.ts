import {
    BaseModule,
    GridModel,
    GridView,
    GridController
} from '../imports';

export class GridModule extends BaseModule {
    public addBindings(): void {
        this
        .asModel(GridModel)
        .asView(GridView)
        .asController(GridController)
        .bind();
    }
}
