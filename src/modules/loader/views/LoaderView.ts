import {
    BaseView,
    Constants,
    AnimationsManager,
    PositionManager,
    IAlignment,
    IPositionSettings,
    LoaderModel
} from '../../imports';

export class LoaderView extends BaseView {
    public model: LoaderModel;
    protected loaderBar: PIXI.Graphics;

    constructor() {
        super();
        this.createLoaderBar();
        this.positionLoaderBar();
        this.addChild(this.loaderBar);
    }

    public loadComplete(): Promise<any> {
        return new Promise((resolve) => {
            AnimationsManager.y(this.loaderBar, this.app.screen.y);
            AnimationsManager.height(this.loaderBar, this.app.screen.height, () => {
                AnimationsManager.hide(this, () => {
                    this.remove();
                    resolve();
                });
            });
        });
    }

    public animateLoaderBar(progress: number): void {
        AnimationsManager.width(this.loaderBar, (this.app.screen.width * progress));
        AnimationsManager.x(this.loaderBar, this.app.screen.width / 2 * (1 - progress));
    }

    private createLoaderBar(): void {
        this.loaderBar = new PIXI.Graphics;
        this.loaderBar.beginFill(0XFFF2CC, 1);
        this.loaderBar.drawRect(0, 0, 1, 1);
    }

    private positionLoaderBar(): void {
        const alignment: IAlignment = {
            x: 'center',
            y: 'center'
        }
        const positionSettings: IPositionSettings = {
            elementToPosition: this.loaderBar,
            elementToPositionTo: this.app.screen,
            alignment: alignment
        }
        PositionManager.set(positionSettings);
    }
}