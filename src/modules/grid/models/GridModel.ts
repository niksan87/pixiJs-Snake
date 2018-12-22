import {
    BaseModel,
    GridModule,
    GameApplication,
    GridElement,
    Constants,
    RewardConstants,
    EventsManager,
    GridElementType,
    SnakeConstants,
    SnakeDirection,
    Utils
} from '../../imports';

export class GridModel extends BaseModel {
    public gridMatrix: GridElement[][];

    public createGridMatrix(): void {
        const texture: PIXI.Texture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.grid);
        const boxSize = texture.width / 2;
        const xNumOfBoxes: number = GameApplication.app.modules[GridModule.name].view.width / boxSize;
        const yNumOfBoxes: number = GameApplication.app.modules[GridModule.name].view.height / boxSize;
        let xPosition: number = 0;
        let yPosition: number = 0;
        
        this.gridMatrix = Utils.createTwoDImensionalArray(xNumOfBoxes, yNumOfBoxes, GridElement);
        this.gridMatrix.forEach((line: Array<GridElement>, lineIndex: number) => {
            xPosition = 0;
            line.forEach((element: GridElement, rowIndex: number) => {
                element.id = `grid_x${rowIndex}_y${lineIndex}`;
                element.x = xPosition;
                element.y = yPosition;
                element.width = boxSize;
                element.height = boxSize;
                element.type = null;
                xPosition += boxSize;
            });
            yPosition += boxSize;
        });
        console.warn(this.gridMatrix);
    }

    public getRewardPosition(): void {
        let gridElement: GridElement = this.getRandomGridPosition();
        if (this.isAlreadyTaken([gridElement])) {
            this.getRewardPosition();
            return;
        }
        gridElement.type = GridElementType.REWARD;
        EventsManager.dispatch(RewardConstants.EVENTS.CREATE_REWARD, {detail: gridElement});
    }

    public getSnakePositions(direction: SnakeDirection): void {
        const snakePositions: GridElement[] = [];
        snakePositions.push(this.getRandomGridPosition());
        snakePositions.push(this.getPreviousGridElement(snakePositions[0], direction));
        snakePositions.push(this.getPreviousGridElement(snakePositions[1], direction));

        if (this.isAlreadyTaken(snakePositions)) {
            this.getSnakePositions(direction);
            return;
        }

        snakePositions.forEach((gridElement: GridElement) => gridElement.type = GridElementType.SNAKE);
        EventsManager.dispatch(SnakeConstants.EVENTS.CREATE_SNAKE, {detail: snakePositions});
    }

    private getPreviousGridElement(gridElement: GridElement, direction: SnakeDirection): GridElement {
        if (!gridElement) {
            return null;
        }

        let outputElement: GridElement;
        let currGridElement: GridElement;

        for (var row = 0; row < this.gridMatrix.length; row++) {
            for (var col = 0; col < this.gridMatrix[row].length; col++) {
                currGridElement = this.gridMatrix[row][col];
                if (currGridElement === gridElement) {
                    switch (direction) {
                        case SnakeDirection.UP:
                            outputElement = this.gridMatrix[row + 1][col];
                        break;
                        case SnakeDirection.RIGHT:
                            outputElement = this.gridMatrix[row][col - 1];
                        break;
                        case SnakeDirection.BOTTOM:
                            outputElement = this.gridMatrix[row - 1][col];
                        break;
                        case SnakeDirection.LEFT:
                            outputElement = this.gridMatrix[row][col + 1];
                        break;
                    }
                }
            }
        }

        return outputElement;
    }

    private getRandomGridPosition(): GridElement {
        const row: number = Utils.getRandomInt(Constants.Safe_margin, this.gridMatrix.length - Constants.Safe_margin - 1);
        const line: number = Utils.getRandomInt(Constants.Safe_margin, this.gridMatrix[row].length - Constants.Safe_margin - 1);
        const gridElement: GridElement = this.gridMatrix[row][line];
        return gridElement;
    }

    private isAlreadyTaken(gridElements: GridElement[]): boolean {
        let output: boolean = false;
        gridElements.forEach((gridElement: GridElement) => {
            if (!gridElement || gridElement.type !== null) {
                output = true;
            }
        });
        
        return output;
    }
}
