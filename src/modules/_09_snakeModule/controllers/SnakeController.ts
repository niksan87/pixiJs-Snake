import {
    TweenLite,
    TweenMax
} from "gsap";

import {
    GameApplication,
    GameModule,
    BaseController,
    SnakeView,
    SnakeModel,
    EventsManager,
    GridElementView,
    SnakeDirection,
    GameConstants,
    SnakeConstants,
    RewardConstants,
    Constants
} from '../../imports';

export class SnakeController extends BaseController {
    public view: SnakeView;
    public model: SnakeModel;

    protected addListeners(): void {
        EventsManager.addListener(SnakeConstants.EVENTS.SNAKE_CREATE, () => {
            if (!this.view.parent) {
                this.view.addTo(GameApplication.app.modules[GameModule.name].view);
            }
            EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_GET_POSITION, 'true');
        });

        EventsManager.addListener(SnakeConstants.EVENTS.SNAKE_SET_POSITION, (event: CustomEvent) => {
            const snakeTail: GridElementView = event.detail;
            this.model.length = Constants.StartSnakeLength;
            this.view.createSnakePart(snakeTail);    
        });

        EventsManager.addListener(GameConstants.EVENTS.GAME_START, () => {
            this.view.speed = Constants.StartingSpeed;
            setTimeout(() => {
                this.model.started = true;
                EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_MOVE, this.view.snakeHeadElementView);
            }, Constants.TimeToStartAfterPlayClick * 1000);
        });

        EventsManager.addListener(SnakeConstants.EVENTS.SNAKE_MOVE, () => {
            this.view.move(
                () => EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_MOVE, this.view.snakeHeadElementView),
                () => EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_SELF_HIT, this.view.snakeHeadElementView),
                () => EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_WALL_HIT, this.view.snakeHeadElementView),
                () => EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_EAT_FRUIT, this.view.snakeHeadElementView)
                );
        });

        EventsManager.addListener(GameConstants.EVENTS.GAME_PAUSE, () => {
            this.model.paused = true;
            TweenMax.pauseAll();
        });

        EventsManager.addListener(GameConstants.EVENTS.GAME_RESUME, () => {
            this.model.paused = false;
            TweenMax.resumeAll();
        });

        EventsManager.addListener(GameConstants.EVENTS.GAME_END, () => {
            this.model.started = false;
        });

        EventsManager.addListener(SnakeConstants.EVENTS.SNAKE_WALL_HIT, () => {
            EventsManager.dispatch(GameConstants.EVENTS.GAME_END);
        });

        EventsManager.addListener(SnakeConstants.EVENTS.SNAKE_EAT_FRUIT, () => {
            this.model.length++;
            this.view.expandSnake(() => EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_MOVE, this.view.snakeHeadElementView));
            EventsManager.dispatch(RewardConstants.EVENTS.REWARD_GET_POSITION, 'false');
        });

        EventsManager.addListener(SnakeConstants.EVENTS.SNAKE_SELF_HIT, () => {
            EventsManager.dispatch(GameConstants.EVENTS.GAME_END);
        });

        EventsManager.addListener(SnakeConstants.EVENTS.SNAKE_SET_NEW_DIRECTION, (event: CustomEvent) => {
            this.view.changeDirection(event.detail);
        });

        EventsManager.addListener(SnakeConstants.EVENTS.SNAKE_GET_LENGTH, (event: CustomEvent) => {
            EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_SEND_LENGTH, {type: event.detail, length: this.model.length });
        });

        EventsManager.addListener('keydown', (event: KeyboardEvent) => {
            let direction: SnakeDirection;
            switch (event.key) {
                case "ArrowLeft": direction = SnakeDirection.LEFT; break;
                case "ArrowRight": direction = SnakeDirection.RIGHT; break;
                case "ArrowUp": direction = SnakeDirection.UP; break;
                case "ArrowDown": direction = SnakeDirection.BOTTOM; break;
            }

            const arrowKey: boolean = event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown';

            if (!arrowKey || !this.model.started || this.model.paused) {
                return;
            }

            const notSameDirection: boolean = direction !== this.view.snakeHeadElementView.direction;
            const notOppositeDirection: boolean = (direction + 0.5 !== this.view.snakeHeadElementView.direction) && (direction - 0.5 !== this.view.snakeHeadElementView.direction);
            
            if (notOppositeDirection && notSameDirection && !this.model.paused) {
                EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_SET_NEW_DIRECTION, direction)
            }
        });
    }
}