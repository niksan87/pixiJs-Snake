import {
    BaseView,
    GridElementView,
    Utils,
    Constants
} from '../../imports';

export class RewardView extends BaseView {
    private rewardTextures: PIXI.Texture[] = [
        PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.apple),
        PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.pineapple),
        PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.berry),
        PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.nut),
        PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.banana)    
    ];

    public createReward(gridElement: GridElementView): void {
        gridElement.setTexture(this.rewardTextures[Utils.getRandomInt(0, this.rewardTextures.length - 1)])
        .addTo(this)
        .show(Constants.StartingSpeed);
    }
}