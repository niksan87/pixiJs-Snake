import {
    BaseView,
    Utils,
    IConstructable,
    Constants,
    GameApplication,
    GridElement
} from '../../imports';

export class GridView extends BaseView {

    public addTo(parent: BaseView): void {
        super.addTo(parent);
        this.createTilingSpriteBackground();
    }

    private createTilingSpriteBackground(): void {
        const texture: PIXI.Texture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.grid);
        const tilingSprite = new PIXI.extras.TilingSprite(
            texture,
            this.parent.width,
            this.parent.height
        );
        this.addChild(tilingSprite);
    }
}