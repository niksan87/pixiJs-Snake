import {
    BaseView,
    Constants,
    AnimationsManager,
    PositionManager,
    IAlignment,
    IPositionSettings,
    LoaderModel,
    GameModule,
    Utils
} from '../../imports';

export class LoaderView extends BaseView {
    public model: LoaderModel;
    protected loaderBar: PIXI.Graphics;
    protected upperOutro: PIXI.Graphics;
    protected lowerOutro: PIXI.Graphics;

    public addTo(parent: PIXI.Container): void {
        super.addTo(parent);
        this.createLoaderBar();
        this.positionLoaderBar();
        this.addChild(this.loaderBar);
    }

    public loadOutro(): Promise<any> {
        return new Promise((resolve) => {            
            this.upperOutro = new PIXI.Graphics();
            this.upperOutro.beginFill(0X000000, 1);
            this.upperOutro.drawRect(0, 0, this.width, this.app.screen.height / 2);
            this.upperOutro.endFill();
            this.addChild(this.upperOutro);

            this.lowerOutro = new PIXI.Graphics();
            this.lowerOutro.beginFill(0X000000, 1);
            this.lowerOutro.drawRect(0, this.app.screen.height / 2 + 1, this.width, this.app.screen.height / 2 - 1);
            this.lowerOutro.endFill();
            this.addChild(this.lowerOutro);
            this.loaderBar.alpha = 0;
            AnimationsManager.height(this.upperOutro, 0);
            AnimationsManager.y(this.lowerOutro, this.app.screen.height / 2);
            
            Promise.resolve();
            // AnimationsManager.y(this.loaderBar, this.app.screen.y);
            // AnimationsManager.height(this.loaderBar, this.app.screen.height, () => {
                //     AnimationsManager.hide(this, () => {
                    //         this.remove();
                    //         resolve();
                    //     });
                    // });
                });
    }

    public animateLoaderBar(progress: number): void {
        AnimationsManager.width(this.loaderBar, (this.app.screen.width * progress));
        AnimationsManager.x(this.loaderBar, this.app.screen.width / 2 * (1 - progress));
    }

    private createLoaderBar(): void {
        this.loaderBar = new PIXI.Graphics;
        this.loaderBar.beginFill(0X78AB46, 1);
        this.loaderBar.drawRect(0, 0, 1, 1);
        this.loaderBar.endFill();
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