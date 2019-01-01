import {
    Graphics,
    Constants
} from '../imports';

export class Button extends Graphics {
    protected text: Graphics;
    protected bg: PIXI.Sprite;
    protected normalTexture: PIXI.Texture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.btn_bg);
    protected hoverTexture: PIXI.Texture = PIXI.Texture.fromImage(Constants.Assets.Images.Url + Constants.Assets.Images.Names.btn_bg_hover);

    constructor(text?: string) {
        super();
        this.createButtonBg();
        this.createButtonText(text);
    }

    private createButtonBg(): void {
        this.bg = new PIXI.Sprite(this.normalTexture);
        this.buttonMode = true;
        this.interactive = true;
        this.addChild(this.bg);
    }

    private createButtonText(text?: string): void {
        this.text = new Graphics();
        const style: PIXI.TextStyle = { fontFamily: 'Verdana, Arial, Sans-serif', fontWeight: 'bold', fill: 0x10794c, fontSize:  this.width / (text.length + 4)} as PIXI.TextStyle;
        const value: PIXI.Text = new PIXI.Text(text, style);
        this.text.addChild(value);
        this.text.alignTo(this, {x: 'center', y: 'center'})
        this.addChild(this.text);
    }

    public onMouseOver(): void {
        this.bg.texture = this.hoverTexture;
        (this.text.children[0] as PIXI.Text).style.fill = 0xffffff;
    }

    public onMouseOut(): void {
        this.bg.texture = this.normalTexture;
        (this.text.children[0] as PIXI.Text).style.fill = 0x10794c;
    }
}