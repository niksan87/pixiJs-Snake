import {
    BaseView,
    GameView,
    GameModule,
    BoardModel,
    Constants,
    GameApplication,
    Utils,
    GridView,
    BoardConstants
} from '../../imports';

export class BoardView extends BaseView {
    public model: BoardModel;
    protected grid: GridView;

    public addTo(parent: BaseView): void {
        super.addTo(parent);
        //this.addBorder();
        this.addBackground();
    }

    private addBackground(): void {
        const texture: PIXI.Texture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.bg);
        const tilingSprite = new PIXI.extras.TilingSprite(texture, this.app.screen.width, this.app.screen.height);
        this.addChild(tilingSprite);
    }

    private addBorder(): void {
        const gt = new PIXI.Graphics();
        gt.beginFill(BoardConstants.SETTINGS.BORDER.COLOR);
        gt.drawRect(0, 0,  this.app.screen.width, this.app.screen.height);
        gt.endFill();
        this.addChild(gt);
    }

}