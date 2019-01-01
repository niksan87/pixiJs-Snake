import {
    BaseView,
    Graphics,
    Constants
} from '../../imports';

export class PauseGameView extends BaseView {
    private infoText: Graphics;

    public addTo(parent: BaseView): void {
        super.addTo(parent);
        this.createInfoText();
    };

    private createInfoText(): void {
        this.infoText = new Graphics();

        const style: PIXI.TextStyle = {
            fontFamily: 'Verdana, Arial, Sans-serif',
            fontWeight: 'bold',
            fill: 0xffffff,
            fontSize: 18,
            align: 'center',
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowDistance: 2,
            lineHeight: 40
        } as PIXI.TextStyle;

        this.infoText.addChild(new PIXI.Text(Constants.Texts.GamePaused.toUpperCase(), style));     
    }

    public setCurrentSnakeLengthInfo(snakeLengthInfo: string): void {
        (this.infoText.children[0] as PIXI.Text).text += snakeLengthInfo + '.\n'+ 'CURRENT SPEED X' + Math.ceil(Number(snakeLengthInfo) / Constants.SpeedIncreaseOnEvery);
        this.infoText.alignTo(this.parent, {x: 'center', y: 'center'});
        this.addChild(this.infoText);
    }
}