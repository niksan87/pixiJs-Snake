import {
    BaseView,
    Constants,
    AnimationsManager,
    PositionManager,
    IAlignment,
    LoaderModel,
    Graphics,
    //GameModule,
    Utils,
    GameApplication
} from '../../imports';

export class LoaderView extends BaseView {
    protected loaderBar: Graphics;
    protected upperElementOutro: Graphics;
    protected lowerElementOutro: Graphics;

    public addTo(parent: PIXI.Container): void {
        super.addTo(parent);
        this.createLoaderBar();
        this.createOutroElements();
    }

    public animateLoading(progress: number): void {
        this.loaderBar.animate.width(GameApplication.app.screen.width * progress);
    }

    public animateOutro(): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.loaderBar.alpha = 0;
                this.upperElementOutro.alpha = 1;
                this.lowerElementOutro.alpha = 1;
                this.upperElementOutro.animate.height(0);
                this.lowerElementOutro.animate.height(0).then(resolve);
            }, Constants.Animations.Duration * 1000);
        });
    }

    private createLoaderBar(): void {
        this.loaderBar = new Graphics();
        this.loaderBar.beginFill(Constants.Assets.Loader.PrimaryColor, 1);
        this.loaderBar.drawRect(0, 0, 2, 1);
        this.loaderBar.endFill();
        this.loaderBar.setAnchor(0.5, 0.5);
        this.loaderBar.alignTo(GameApplication.app.screen, { x: 'center', y: 'center' });
        this.addChild(this.loaderBar);
    }

    private createOutroElements(): void {
        this.upperElementOutro = this.createOutroElement();
        this.upperElementOutro.setAnchor(0, 0);
        this.upperElementOutro.alignTo(GameApplication.app.screen, { x: 'center', y: 'top' });
        this.addChild(this.upperElementOutro);
        this.lowerElementOutro = this.createOutroElement();
        this.lowerElementOutro.setAnchor(0, 1);
        this.lowerElementOutro.alignTo(GameApplication.app.screen, { x: 'center', y: 'bottom' });
        this.addChild(this.lowerElementOutro);
    }

    private createOutroElement(): Graphics {
        const element = new Graphics();
        element.alpha = 0;
        element.beginFill(Constants.Assets.Loader.SecondaryColor, 1);
        element.drawRect(0, 0, GameApplication.app.screen.width, GameApplication.app.screen.height / 2);
        element.endFill();
        return element;
    }
}