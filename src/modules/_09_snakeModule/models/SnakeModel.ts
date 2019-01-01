import {
    BaseModel,
    SnakeDirection,
    Utils
} from '../../imports';


export class SnakeModel extends BaseModel {
    private _direction: SnakeDirection;
    public paused: boolean;
    public started: boolean;
    public length: number;
    
    get direction() {
        return this._direction;
    }

    public setRandomDirection(): void {
        const directions: number[] = [];
        for (let direction in SnakeDirection) {
            if (Number(direction)) {
                directions.push(Number(direction));
            }  
        }
        this._direction = directions[Utils.getRandomInt(0, 3)];
    }
}