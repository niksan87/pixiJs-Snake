import {
    GameApplication,
    BackgroundView,
    BaseView,
    GridView,
    SnowView,
    Constants
} from '../../imports';

export class BoardView extends BaseView {
    protected grid: GridView;
    protected background: BackgroundView;
    public snow: SnowView;

    public addTo(parent: BaseView): void {
        super.addTo(parent);
        if (!this.background) {
            this.background = new BackgroundView();
            this.background.addTo(this);
        }
        if (Constants.Snow.Active) {
            this.createSnow();
        }
    }

    private createSnow(): void {
        this.snow = new SnowView();
        this.snow.addTo(GameApplication.app.stage)
    }
}