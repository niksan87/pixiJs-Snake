import {
    BaseModule,
    SnakeModel,
    SnakeView,
    SnakeController
} from '../imports';

export class SnakeModule extends BaseModule {

    public addBindings(): void {
        this
        .asModel(SnakeModel)
        .asView(SnakeView)
        .asController(SnakeController)
        .bind();
    }

}