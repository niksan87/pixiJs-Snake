import {
    GameApplication,
    BaseController,
    EventsManager,
    GameView,
    GameModel,
    GameConstants,
    BoardConstants,
    RewardConstants,
    SnakeConstants
} from '../../imports';

export class GameController extends BaseController {
    public view: GameView;
    public model: GameModel;

    protected addListeners(): void {
        EventsManager.addListener(GameConstants.EVENTS.GAME_CREATE, () => {
            this.view.addTo(GameApplication.app.stage);
            EventsManager.dispatch(BoardConstants.EVENTS.BOARD_CREATE);
            EventsManager.dispatch(RewardConstants.EVENTS.REWARD_CREATE);
            EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_CREATE);
            setTimeout(() => {EventsManager.dispatch(GameConstants.EVENTS.GAME_CREATE_FINISH);}, 0);
        });

        EventsManager.addListener('keydown', (event: KeyboardEvent) => {
            if (event.key === ' ') {
                if (this.model.paused) {
                    EventsManager.dispatch(GameConstants.EVENTS.GAME_RESUME);
                } else {
                    EventsManager.dispatch(GameConstants.EVENTS.GAME_PAUSE);
                }
                this.model.paused = !this.model.paused;                
            }
        });
    }
}