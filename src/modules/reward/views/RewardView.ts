import {
    BaseView,
    Constants,
    GridElement
} from '../../imports';

export class RewardView extends BaseView {

    public createReward(gridElement: GridElement): void {
        const reward: PIXI.Sprite = PIXI.Sprite.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.apple);
        reward.x = gridElement.x;
        reward.y = gridElement.y;
        this.addChild(reward);
    }
}