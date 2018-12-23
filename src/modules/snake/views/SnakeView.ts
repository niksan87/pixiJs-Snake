import {
    BaseView,
    SnakeModel,
    BoardConstants,
    GridElement,
    Constants,
    SnakeDirection
} from '../../imports';

export class SnakeView extends BaseView {
    protected head: PIXI.Sprite;
    protected body: PIXI.Sprite;
    protected tail: PIXI.Sprite;
    protected direction: SnakeDirection;

    public createSnake(gridElements: GridElement[], direction: SnakeDirection): void {
        this.head = PIXI.Sprite.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_head);
        this.body = PIXI.Sprite.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_body);
        this.tail = PIXI.Sprite.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_tail);
        this.direction = direction;
        this.positionSnakePart(this.head, gridElements[0]);
        this.positionSnakePart(this.body, gridElements[1]);
        this.positionSnakePart(this.tail, gridElements[2]);
    }

    private positionSnakePart(snakePart: PIXI.Sprite, gridElement: GridElement): void {
        snakePart.x = gridElement.x;
        snakePart.y = gridElement.y;
        const fullRotationInRadians: number = 6.28319;
        snakePart.rotation = fullRotationInRadians * this.direction;
        this.addChild(snakePart);
    }

    public move(deltaTime: number): void {

        switch (this.direction) {
            case SnakeDirection.UP:
                this.head.y -= Constants.Starting_speed * deltaTime;
                this.body.y -= Constants.Starting_speed * deltaTime;
                this.tail.y -= Constants.Starting_speed * deltaTime;
            break;

            case SnakeDirection.RIGHT:
                this.head.x += Constants.Starting_speed * deltaTime;
                this.body.x += Constants.Starting_speed * deltaTime;
                this.tail.x += Constants.Starting_speed * deltaTime;
            break;

            case SnakeDirection.BOTTOM:
                this.head.y += Constants.Starting_speed * deltaTime;
                this.body.y += Constants.Starting_speed * deltaTime;
                this.tail.y += Constants.Starting_speed * deltaTime;
            break;

            case SnakeDirection.LEFT:
                this.head.x -= Constants.Starting_speed * deltaTime;
                this.body.x -= Constants.Starting_speed * deltaTime;
                this.tail.x -= Constants.Starting_speed * deltaTime;
            break;
            
            default:
            // code...
            break;
        }
    }

}