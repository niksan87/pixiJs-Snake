import {
    BaseView,
    Utils,
    IConstructable,
    Constants
} from '../../imports';

export class GridView extends BaseView {
    public grid: Array<Array<GridElement>>;
    private boxSize: number;

    public addTo(parent: BaseView): void {
        super.addTo(parent);
        this.createTilingSpriteBackground();
        this.createGridMatrix();
        console.warn(this.grid);
    }

    private createTilingSpriteBackground(): void {
        const texture: PIXI.Texture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.grid);
        this.boxSize = texture.width / 2;
        const tilingSprite = new PIXI.extras.TilingSprite(texture, this.app.screen.width, this.app.screen.height);
        this.addChild(tilingSprite);
    }

    private createGridMatrix(): void {
        const xNumOfBoxes: number = this.app.screen.width / this.boxSize;
        const yNumOfBoxes: number = this.app.screen.height / this.boxSize;
        let xPosition: number = 0;
        let yPosition: number = 0;
        
        this.grid = Utils.createTwoDImensionalArray(xNumOfBoxes, yNumOfBoxes, GridElement);
        this.grid.forEach((line: Array<GridElement>, lineIndex: number) => {
            xPosition = 0;
            line.forEach((element: GridElement, rowIndex: number) => {
                element.id = `grid_x${rowIndex}_y${lineIndex}`;
                element.x = xPosition;
                element.y = yPosition;
                element.width = this.boxSize;
                element.height = this.boxSize;
                xPosition += this.boxSize;
            });
            yPosition += this.boxSize;
        })
    }
}

export class GridElement {
    public id: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
}