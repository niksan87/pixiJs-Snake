import {
    BaseView,
    Graphics,
    Button,
    Constants
} from '../../imports';

export class InitialScreenView extends BaseView {
    private logo: Graphics;
    public playButton: Graphics;
    private infoText: Graphics;

    public addTo(parent: BaseView): void {
        super.addTo(parent);
        this.createLogo();
        this.createPlayButton();
        this.createInfoText();
    }

    private createLogo(): void {
        this.logo = new Graphics();
        this.logo.addChild(PIXI.Sprite.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.logo));
        this.logo.alignTo(this.parent, {x: 'center', y: 'center'});
        this.logo.y -= this.logo.height / 2;
        this.addChild(this.logo);
    }

    private createPlayButton(): void {
        this.playButton = new Graphics();
        this.playButton.addChild(new Button(Constants.Texts.PlayButton.toUpperCase()));
        this.playButton.alignTo(this.parent, {x: 'center', y: 'center'});
        this.addChild(this.playButton);
        this.playButton.y += this.playButton.height / 2;
    }

    private createInfoText(): void {
        this.infoText = new Graphics();

        const style: PIXI.TextStyle = {
            fontFamily: 'Verdana, Arial, Sans-serif',
            fontWeight: 'bold',
            fill: 0xffffff,
            fontSize: 14,
            align: 'center',
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowDistance: 2
        } as PIXI.TextStyle;

        this.infoText.addChild(new PIXI.Text(Constants.Texts.InfoText, style));
        this.infoText.alignTo(this.parent, {x: 'center', y: 'center'});
        this.addChild(this.infoText);
        this.infoText.y += this.playButton.height * 1.5 - this.infoText.height / 2;
    }
}