import {
    BaseView,
    BoardModule,
    BoardView,
    SnakeModule,
    SnakeView,
    GameModel
} from '../../imports';

export class GameView extends BaseView {
    public model: GameModel;
    protected board: BoardView;
    protected snake: SnakeView;

    constructor() {
        super();
        // this.board = this.app.modules[BoardModule.name].view as BoardView;
        // this.snake = this.app.modules[SnakeModule.name].view as SnakeView;
        // this.board.addTo(this);
        // this.snake.addTo(this);
    }
}