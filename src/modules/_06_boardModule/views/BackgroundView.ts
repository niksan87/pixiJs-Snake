import {
    GameApplication,
    BaseView,
    GridView,
    Constants
} from '../../imports';

export class BackgroundView extends BaseView {
    protected grid: GridView;

    constructor() {
        super();
        this.addBackground();
    }

    private addBackground(): void {
        const bgTexture: PIXI.Texture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.bg);
        const tilingSprite = new PIXI.extras.TilingSprite(bgTexture, GameApplication.app.screen.width, GameApplication.app.screen.height);
        this.addChild(tilingSprite);
    }

}