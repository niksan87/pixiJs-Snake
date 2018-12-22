import {
    BaseModel,
    SnakeDirection,
    Utils,
    EventsManager,
    SnakeConstants
} from '../../imports';


export class SnakeModel extends BaseModel {
    public _direction: SnakeDirection;

    get direction() {
        return this._direction;
    }

    public setRandomDirection(): void {
        const directions: number[] = [];
        for (var direction in SnakeDirection) {
            if (Number(direction)) {
                directions.push(Number(direction));
            }  
        }
        this._direction = directions[Utils.getRandomInt(0, 3)];
        EventsManager.dispatch(SnakeConstants.EVENTS.GET_SNAKE_DIRECTION, { detail: this.direction });
    }
}