import {
    BaseController,
    EventsManager,
    GameConstants,
    GameView,
    GameModel,
    GameApplication,
    BoardConstants,
    RewardConstants,
    SnakeConstants
} from '../../imports';

export class GameController extends BaseController {
    public view: GameView;
    public model: GameModel;

    protected addListeners(): void {
        EventsManager.addListener(GameConstants.EVENTS.CREATE_GAME, () => {
            this.view.addTo(GameApplication.app.stage);
            EventsManager.dispatch(BoardConstants.EVENTS.CREATE_BOARD);
            EventsManager.dispatch(RewardConstants.EVENTS.CREATE_REWARDS_VIEW);
            EventsManager.dispatch(RewardConstants.EVENTS.GET_REWARD_POSITION);
            EventsManager.dispatch(SnakeConstants.EVENTS.CREATE_SNAKE_VIEW);
            setTimeout(() => {
                EventsManager.dispatch(GameConstants.EVENTS.GAME_CREATED);
            }, 5000);
        });

        EventsManager.addListener(SnakeConstants.EVENTS.GET_SNAKE_DIRECTION, (event: CustomEvent) => {
            EventsManager.dispatch(SnakeConstants.EVENTS.GET_SNAKE_POSITION, {detail: event.detail});
        });

        EventsManager.addListener(GameConstants.EVENTS.START_GAME, () => {
            
        });
    }
}