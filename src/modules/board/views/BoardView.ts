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
    protected grid: GridView;

    public addTo(parent: BaseView): void {
        super.addTo(parent);
        this.addBackground();
    }

    private addBackground(): void {
        const texture: PIXI.Texture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.bg);
        const tilingSprite = new PIXI.extras.TilingSprite(texture, GameApplication.app.screen.width, GameApplication.app.screen.height);
        this.addChild(tilingSprite);
    }

}