import {
    BaseModule,
    BoardModel,
    BoardView,
    BoardController
} from '../imports';

export class BoardModule extends BaseModule {

    public addBindings(): void {
        this
        .asModel(BoardModel)
        .asView(BoardView)
        .asController(BoardController)
        .bind();
    }

}