import {
    GameApplication,
    BaseController,
    EventsManager,
    GameView,
    GameModel,
    GameConstants,
    BoardConstants,
    RewardConstants,
    SnakeConstants,
    ActionsManager,
    StartGameAction,
    GridConstants,
    Graphics,
    Button,
    Constants
} from '../../imports';

export class GameController extends BaseController {
    public view: GameView;
    public model: GameModel;

    protected addListeners(): void {
        EventsManager.addListener(GameConstants.EVENTS.GAME_CREATE, () => {
            this.view.addTo(GameApplication.app.stage);
            EventsManager.dispatch(BoardConstants.EVENTS.BOARD_CREATE);
            EventsManager.dispatch(GameConstants.EVENTS.GAME_INITIAL_SCREEN);
        });

        EventsManager.addListener(GameConstants.EVENTS.GAME_INITIAL_SCREEN, () => {
            this.view.createInitialScreenView();
            const playButton: Button = (this.view.initialScreenView.playButton.children[0] as Button);
            playButton.on('mouseover', () => playButton.onMouseOver());
            playButton.on('mouseout', () => playButton.onMouseOut());
            
        });

        EventsManager.addListener(GameConstants.EVENTS.GAME_ENABLE_FUNCTIONALITY, () => {
            const playButton: Button = (this.view.initialScreenView.playButton.children[0] as Button);
            playButton.on('mousedown', () => {
                this.view.initialScreenView.remove();
                EventsManager.dispatch(RewardConstants.EVENTS.REWARD_CREATE);
                EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_CREATE);
                EventsManager.dispatch(GameConstants.EVENTS.GAME_CREATE_FINISH);
                EventsManager.dispatch('START_NEXT_ACTION');
            });
        });

        EventsManager.addListener('keydown', (event: KeyboardEvent) => {
            if (event.key === ' ' && this.model.started) {
                if (this.model.paused) {
                    EventsManager.dispatch(GameConstants.EVENTS.GAME_RESUME);
                } else {
                    EventsManager.dispatch(GameConstants.EVENTS.GAME_PAUSE);
                }
                this.model.paused = !this.model.paused;                
            }
        });

        EventsManager.addListener(GameConstants.EVENTS.GAME_PAUSE, () => {
            this.view.createPauseScreenView();
            EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_GET_LENGTH, this.view.pauseGameView.constructor.name);
        });

        EventsManager.addListener(SnakeConstants.EVENTS.SNAKE_SEND_LENGTH, (event: CustomEvent) => {

            const type: string = (event.detail as any).type;
            if (this.view.pauseGameView && type === this.view.pauseGameView.constructor.name) {
                this.view.pauseGameView.setCurrentSnakeLengthInfo(event.detail.length);
            } else if(this.view.gameOverView) {
                this.view.gameOverView.setCurrentSnakeLengthInfo(event.detail.length); 
            }
        });

        EventsManager.addListener(GameConstants.EVENTS.GAME_RESUME, () => {
            this.view.pauseGameView.remove();
            this.view.removeChild(this.view.overlay);
        });

        EventsManager.addListener(GameConstants.EVENTS.GAME_START, () => {
            setTimeout(() => {
                this.model.started = true;
            }, Constants.TimeToStartAfterPlayClick * 1000);
        });

        EventsManager.addListener(GameConstants.EVENTS.GAME_END, (event: CustomEvent) => {
            this.model.started = false;
            this.view.createGameOverScreenView();
            EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_GET_LENGTH);
            const playAgainButton: Button = (this.view.gameOverView.playAgainButton.children[0] as Button);
            playAgainButton.on('mouseover', () => playAgainButton.onMouseOver());
            playAgainButton.on('mouseout', () => playAgainButton.onMouseOut());
            playAgainButton.on('mousedown', () => {
                this.view.removeChildren();
                EventsManager.dispatch(GridConstants.EVENTS.RESET_GRID);
                EventsManager.dispatch(BoardConstants.EVENTS.BOARD_CREATE);
                EventsManager.dispatch(RewardConstants.EVENTS.REWARD_CREATE);
                EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_CREATE);
                ActionsManager.executeAction(new StartGameAction());
            });
        });


    }
}