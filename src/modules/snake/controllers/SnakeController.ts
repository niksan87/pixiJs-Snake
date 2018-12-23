import {
    BaseController,
    SnakeView,
    SnakeModel,
    EventsManager,
    GameModule,
    SnakeConstants,
    GameApplication,
    GameConstants,
    Utils
} from '../../imports';

export class SnakeController extends BaseController {
    public view: SnakeView;
    public model: SnakeModel;

    protected addListeners(): void {
        EventsManager.addListener(SnakeConstants.EVENTS.CREATE_SNAKE_VIEW, () => {
            this.model.setRandomDirection();
            this.view.addTo(GameApplication.app.modules[GameModule.name].view);
        });

        EventsManager.addListener(SnakeConstants.EVENTS.CREATE_SNAKE, (event: CustomEvent) => {
            this.view.createSnake(event.detail, this.model.direction);
        });

        EventsManager.addListener(GameConstants.EVENTS.START_GAME, () => {
            GameApplication.app.ticker.add((deltaTime: number) => {
                this.view.move(deltaTime);
            });
        });
    }
}