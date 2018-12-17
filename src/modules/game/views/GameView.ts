import {
    BaseView,
    BoardModule,
    BoardView,
    SnakeModule,
    SnakeView,
    Utils,
    LoaderModule,
    GameModel
} from '../../imports';

export class GameView extends BaseView {
    public model: GameModel;
    protected board: BoardView;
    protected snake: SnakeView;

    public addTo(parent: PIXI.Container): void {
        super.addTo(parent);
        this.app.stage.swapChildren(this, Utils.getModule(LoaderModule).view)
    }
}