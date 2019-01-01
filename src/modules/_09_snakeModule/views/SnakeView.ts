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
    public speed: number;
    private snakeIncrease: number = 0;

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
        this.snakeTailElementView
        .show(this.speed, () => {
            this.expanded = false;
            this.shouldIncreaseSpeed();
            onComplete();
        });
    }

    private shouldIncreaseSpeed(): void {
        this.snakeIncrease++; 
        if (this.snakeIncrease === Constants.SpeedIncreaseOnEvery) {
            this.speed -= this.speed * (Constants.SpeedIncreasePercentage / 100);
            this.speed = Number(this.speed.toFixed(4));
            console.log(this.speed);
            this.snakeIncrease = 0;
        }
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
        .move(this.speed);

        oldSnakeHead
        .setType(GridElementType.SNAKE_BODY)
        .setDirection(newSnakeHead.direction);

        if (oldSnakeHead.prevDirection) {
            oldSnakeHead.setRotation(0);
            this.setCornerTexture(oldSnakeHead);
        } else {
            oldSnakeHead
            .setTexture(PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_body))
            .setRotation();
        }
    }

    private setCornerTexture(element: GridElementView): void {
        let textureName: string;
        if ((element.prevDirection === SnakeDirection.RIGHT && element.direction === SnakeDirection.UP) || 
            (element.prevDirection === SnakeDirection.BOTTOM && element.direction === SnakeDirection.LEFT)) {
            textureName = Constants.Assets.Images.Names.snake_corner_lu;
    } else if ((element.prevDirection === SnakeDirection.RIGHT && element.direction === SnakeDirection.BOTTOM) ||
        (element.prevDirection === SnakeDirection.UP && element.direction === SnakeDirection.LEFT)) {
        textureName = Constants.Assets.Images.Names.snake_corner_ld;
    } else if ((element.prevDirection === SnakeDirection.LEFT && element.direction === SnakeDirection.UP) || 
        (element.prevDirection === SnakeDirection.BOTTOM && element.direction === SnakeDirection.RIGHT)) {
        textureName = Constants.Assets.Images.Names.snake_corner_ru;
    } else if ((element.prevDirection === SnakeDirection.LEFT && element.direction === SnakeDirection.BOTTOM) ||
        (element.prevDirection === SnakeDirection.UP && element.direction === SnakeDirection.RIGHT)) {
        textureName = Constants.Assets.Images.Names.snake_corner_rd;
    }
    element.setTexture(PIXI.Texture.fromImage(Constants.Assets.Images.Url + textureName));
}

private moveSnakeTail(onComplete: Function): void {
    const oldSnakeTail: GridElementView = this.snakeTailElementView;
    const newSnakeTail: GridElementView = this.snakeTailElementView.getNextElementView();
    this.snakeTailElementView = newSnakeTail;
    this.swapChildren(oldSnakeTail, this.snakeTailElementView);
    oldSnakeTail.move(this.speed, () => {
        newSnakeTail.setRotation();
        this.snakeTailElementView.setTexture(PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_tail));
        oldSnakeTail.reset();
        onComplete();
    });
}

public changeDirection(direction: SnakeDirection): void {
    const notOppositeDirection: boolean = (direction + 0.5 !== this.snakeHeadElementView.prevDirection) && (direction - 0.5 !== this.snakeHeadElementView.prevDirection);
    if (notOppositeDirection) {
        this.snakeHeadElementView.setPrevDirection(this.snakeHeadElementView.direction);
        this.snakeHeadElementView.setDirection(direction);
    }
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