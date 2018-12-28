import {
    BaseView,
    GridElementView,
    Constants
} from '../../imports';

export class RewardView extends BaseView {

    public createReward(gridElement: GridElementView): void {
        gridElement.setTexture(PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.apple))
        .addTo(this)
        .show();
    }
}