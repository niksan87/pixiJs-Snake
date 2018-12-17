import {
    BaseView,
    SnakeModel,
    BoardConstants
} from '../../imports';

export class SnakeView extends BaseView {
    public model: SnakeModel;

    public addTo(parent: BaseView): void {
        super.addTo(parent);
        // const gt = new PIXI.Graphics();
        // gt.beginFill(BoardConstants.SETTINGS.BORDER.COLOR);
        // gt.drawRect(0, 0,  this.app.screen.width, this.app.screen.height);
        // gt.endFill();
        // this.addChild(gt);
    }
}