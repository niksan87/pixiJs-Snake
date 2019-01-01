import {
    BaseView,
    Button,
    Graphics,
    Constants
} from '../../imports';

export class GameOverView extends BaseView {
    protected gameOverText: Graphics;
    public playAgainButton: Graphics;

    public addTo(parent: BaseView): void {
        super.addTo(parent);
        this.createGameOverText();
        this.createPlayAgainButton();
    }

    private createGameOverText(): void {
        this.gameOverText = new Graphics();

        const style: PIXI.TextStyle = {
            fontFamily: 'Verdana, Arial, Sans-serif',
            fontWeight: 'bold',
            fill: 0xffffff,
            fontSize: 26,
            align: 'center',
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowDistance: 2,
            lineHeight: 40
        } as PIXI.TextStyle;

        this.gameOverText.addChild(new PIXI.Text(Constants.Texts.GameOver.toUpperCase(), style));
        this.addChild(this.gameOverText);
    }

    private createPlayAgainButton(): void {
        this.playAgainButton = new Graphics();
        this.playAgainButton.addChild(new Button(Constants.Texts.PlayAgainButton.toUpperCase()));
        this.playAgainButton.alignTo(this.parent, {x: 'center', y: 'center'});
        this.addChild(this.playAgainButton);
        this.playAgainButton.y += this.playAgainButton.height / 2;
    }

    public setCurrentSnakeLengthInfo(snakeLengthInfo: string): void {
        (this.gameOverText.children[0] as PIXI.Text).text += snakeLengthInfo + '.\n'+ 'CURRENT SPEED X' + Math.ceil(Number(snakeLengthInfo) / Constants.SpeedIncreaseOnEvery);
        this.gameOverText.alignTo(this.parent, {x: 'center', y: 'center'});
        this.gameOverText.y -= this.gameOverText.height / 2;
    }
}