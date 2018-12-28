import {
    BaseView,
    GridElementView,
    SnakeDirection,
    GridElementType,
    RewardConstants,
    Constants,
    EventsManager,
    Utils
} from '../../imports';

export class SnakeView extends BaseView {
    public snakeHeadElementView: GridElementView;
    public snakeTailElementView: GridElementView;
    private expanded: boolean;

    public move(onComplete: Function, onSelfHit: Function, onWallHit: Function, onEatFruit: Function): void {
        this.snakeHeadElementView.nextElementView = this.snakeHeadElementView.getNextElementView();     
        if (this.snakeHeadElementView.nextElementView) {
            if (this.snakeHeadElementView.nextElementView.type) {
                if (this.snakeHeadElementView.nextElementView.type === GridElementType.REWARD) {
                    onEatFruit();
                } else {
                    onSelfHit();
                    return;
                }
            }
            this.moveSnakeHead();
            if (!this.expanded) {
                this.moveSnakeTail(onComplete);
            }
        } else {
            onWallHit();
        }
    }

    public expandSnake(onComplete: Function): void {
        this.expanded = true;
        const oldSnakeTail: GridElementView = this.snakeTailElementView;
        const newSnakeTail: GridElementView = this.snakeTailElementView.getPreviousElementView();
        this.snakeTailElementView = newSnakeTail;

        newSnakeTail
        .setType(GridElementType.SNAKE_TAIL)
        .setTexture(PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_tail))
        .setDirection(oldSnakeTail.prevDirection || oldSnakeTail.direction)
        .setRotation()
        .addTo(this)
        .show(() => {
            this.expanded = false;
            onComplete();
        });

        oldSnakeTail
        .setType(GridElementType.SNAKE_BODY)
        .setTexture(PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_body));

        this.swapChildren(newSnakeTail, oldSnakeTail);
    }

    private moveSnakeHead(): void {
        let oldSnakeHead: GridElementView = this.snakeHeadElementView;
        let newSnakeHead: GridElementView = this.snakeHeadElementView.nextElementView;
        this.snakeHeadElementView = newSnakeHead;

        newSnakeHead
        .setType(GridElementType.SNAKE_HEAD)
        .setTexture(PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_head))
        .setDirection(oldSnakeHead.direction)
        .setPosition(oldSnakeHead.position)
        .setRotation()
        .addTo(this)
        .move();

        if (oldSnakeHead.prevDirection) {
            oldSnakeHead.setTexture(PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_corner))
        } else {
            oldSnakeHead.setTexture(PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_body))
        }

        oldSnakeHead
        .setType(GridElementType.SNAKE_BODY)
        .setDirection(newSnakeHead.direction)
        .setRotation();
    }

    private moveSnakeTail(onComplete: Function): void {
        const oldSnakeTail: GridElementView = this.snakeTailElementView;
        this.snakeTailElementView = this.snakeTailElementView.getNextElementView();
        this.swapChildren(oldSnakeTail, this.snakeTailElementView);
        oldSnakeTail.move(() => {
            this.snakeTailElementView.setTexture(PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_tail));
            oldSnakeTail.reset();
            onComplete();
        });
    }

    public changeDirection(direction: SnakeDirection): void {
        this.snakeHeadElementView.setPrevDirection(this.snakeHeadElementView.direction);
        this.snakeHeadElementView.setDirection(direction);
    }

    public createSnakePart(previousSnakePartView: GridElementView, snakeLengthCounter: number = 1): void {
        if (snakeLengthCounter > Constants.StartSnakeLength) {
            return;
        }

        let newSnakePartView: GridElementView;
        let snakeTexture: PIXI.Texture;
        let snakeType: GridElementType;

        if (snakeLengthCounter === 1) {
            newSnakePartView = previousSnakePartView;
            snakeTexture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_tail);
            snakeType = GridElementType.SNAKE_TAIL;
            this.snakeTailElementView = newSnakePartView;
        } else {
            newSnakePartView = previousSnakePartView.getNextElementView();
            if(snakeLengthCounter === Constants.StartSnakeLength){
                snakeTexture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_head);
                snakeType = GridElementType.SNAKE_HEAD;
                this.snakeHeadElementView = newSnakePartView;
            } else {
                snakeTexture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_body);
                snakeType = GridElementType.SNAKE_BODY;
            }
        }

        newSnakePartView
        .setTexture(snakeTexture)
        .setType(snakeType)
        .setDirection(previousSnakePartView.direction)
        .setRotation();
        this.addChild(newSnakePartView);

        this.createSnakePart(newSnakePartView, ++snakeLengthCounter);
    }

}