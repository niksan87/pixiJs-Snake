import {
    BaseController,
    EventsManager,
    GameConstants,
    GameView,
    GameModel,
    BoardConstants,
    SnakeConstants
} from '../../imports';

export class GameController extends BaseController {
    public view: GameView;
    public model: GameModel;

    protected addListeners(): void {
        EventsManager.addListener(GameConstants.EVENTS.CREATE_GAME, () => {
            this.view.addTo(this.app.stage);
            EventsManager.dispatch(BoardConstants.EVENTS.CREATE_BOARD);
            EventsManager.dispatch(SnakeConstants.EVENTS.CREATE_SNAKE);
        });   
    }
}