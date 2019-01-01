import {
    BaseView,
    Constants
} from '../../imports';

export class GridView extends BaseView {

    public addTo(parent: BaseView): void {
        super.addTo(parent);
        this.createTilingSpriteBackground();
        this.createSnowOverlay();
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

    private createSnowOverlay(): void {
        const frameTexture: PIXI.Texture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.snow_frame);
        const sprite: PIXI.Sprite = new PIXI.Sprite(frameTexture);
        sprite.width = this.width;
        sprite.height = this.height;
        this.addChild(sprite);
    }
}