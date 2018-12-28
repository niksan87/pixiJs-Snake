import {
    GameApplication,
    BaseModel,
    GridModule,
    GridElementView,
    EventsManager,
    GridElementType,
    Utils,
    RewardConstants,
    SnakeConstants,
    Constants,
} from '../../imports';

export class GridModel extends BaseModel {
    public gridMatrix: GridElementView[][];
    public reward: GridElementView;

    public createGridMatrix(): void {
        const texture: PIXI.Texture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.grid);
        const gridSize = texture.width / 2;
        const xNumOfGridElements: number = GameApplication.app.modules[GridModule.name].view.width / gridSize;
        const yNumOfGridElements: number = GameApplication.app.modules[GridModule.name].view.height / gridSize;
        let xPosition: number = 0;
        let yPosition: number = 0;
        
        this.gridMatrix = Utils.createTwoDImensionalArray(xNumOfGridElements, yNumOfGridElements, GridElementView);
        this.gridMatrix.forEach((line: Array<GridElementView>, lineIndex: number) => {
            xPosition = 0;
            line.forEach((element: GridElementView, rowIndex: number) => {   
                element.width = gridSize;
                element.height = gridSize;
                element.pivot.x = element.width / 2;
                element.pivot.y = element.height / 2;
                element.x = xPosition + element.pivot.x;
                element.y = yPosition + element.pivot.y;
                element.initX = element.x;
                element.initY = element.y;
                element.matrixXPosition = rowIndex;
                element.matrixYPosition = lineIndex;
                element.matrix = this.gridMatrix;
                xPosition += gridSize;
            });
            yPosition += gridSize;
        });
    }

    public setRandomGridPosition(type: GridElementType, withSafeMargin: boolean): void {
        const gridElementView: GridElementView = this.getRandomGridPosition(withSafeMargin);
        gridElementView.type = type;
        if (type === GridElementType.REWARD) {
            EventsManager.dispatch(RewardConstants.EVENTS.REWARD_SET_POSITION, gridElementView);
        } else {
            gridElementView.setRandomDirection();
            EventsManager.dispatch(SnakeConstants.EVENTS.SNAKE_SET_POSITION, gridElementView);
        }
    }

    private getRandomGridPosition(withSafeMargin: boolean): GridElementView {
        const row: number = Utils.getRandomInt(Constants.ElementsSafeMargin, this.gridMatrix.length - Constants.ElementsSafeMargin - 1);
        const line: number = Utils.getRandomInt(Constants.ElementsSafeMargin, this.gridMatrix[row].length - Constants.ElementsSafeMargin - 1);
        let gridElementView: GridElementView = this.gridMatrix[row][line];
        const getRandomGridPositionWithoutSafeMargin: boolean = gridElementView.isAlreadyTaken();
        const getRandomGridPositionWithSafeMargin: boolean = getRandomGridPositionWithoutSafeMargin || gridElementView.hasElementNearby();
        if ((withSafeMargin && getRandomGridPositionWithSafeMargin) || (!withSafeMargin && getRandomGridPositionWithoutSafeMargin)) {
            gridElementView = this.getRandomGridPosition(withSafeMargin);
        }
        return gridElementView;
    }

}
