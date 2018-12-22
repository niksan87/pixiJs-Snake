import {
    BaseView,
    SnakeModel,
    BoardConstants,
    GridElement,
    Constants,
    SnakeDirection
} from '../../imports';

export class SnakeView extends BaseView {
    public createSnake(gridElements: GridElement[], direction: SnakeDirection): void {
        const snakeHead: PIXI.Sprite = PIXI.Sprite.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_head);
        const snakeBody: PIXI.Sprite = PIXI.Sprite.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_body);
        const snakeTail: PIXI.Sprite = PIXI.Sprite.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snake_tail);

        this.createSnakePart(snakeHead, gridElements[0], direction);
        this.createSnakePart(snakeBody, gridElements[1], direction);
        this.createSnakePart(snakeTail, gridElements[2], direction);
    }

    private createSnakePart(snakePart: PIXI.Sprite, gridElement: GridElement, direction: SnakeDirection): void {
        snakePart.x = gridElement.x;
        snakePart.y = gridElement.y;
        const fullRotationInRadians: number = 6.28319;
        snakePart.rotation = fullRotationInRadians * direction;
        this.addChild(snakePart);
    }

}