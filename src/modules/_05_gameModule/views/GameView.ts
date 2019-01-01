import {
    GameApplication,
    BaseView,
    GameModule,
    LoaderModule,
    Button,
    Graphics,
    Constants,
    InitialScreenView,
    PauseGameView,
    GameOverView
} from '../../imports';

export class GameView extends BaseView {
    public initialScreenView: InitialScreenView;
    public pauseGameView: PauseGameView;
    public gameOverView: GameOverView;
    public overlay: Graphics;

    public button: Button;
    public logo: Graphics;
    public infoText: Graphics;
    public pausedText: Graphics;

    constructor() {
        super();
    }

    public addTo(parent: PIXI.Container): void {
        super.addTo(parent);  
        if (GameApplication.app.stage.children.some((child) => child === GameApplication.app.modules[LoaderModule.name].view)) {
            GameApplication.app.stage.swapChildren(
                GameApplication.app.modules[LoaderModule.name].view,
                GameApplication.app.modules[GameModule.name].view
                );
        }     
    }

    public createInitialScreenView(): void {
        //this.createOverlay();
        this.initialScreenView = new InitialScreenView();
        this.initialScreenView.addTo(this);
    }

    public createPauseScreenView(): void {
        this.createOverlay();
        this.pauseGameView = new PauseGameView();
        this.pauseGameView.addTo(this);
    }

    public createGameOverScreenView(): void {
        this.createOverlay();
        this.gameOverView = new GameOverView();
        this.gameOverView.addTo(this);
    }

    public createInfoText(text: string): void {
        if (!this.infoText) {
            this.infoText = new Graphics();
            this.addChild(this.infoText);
        }
        const style: PIXI.TextStyle = { fontFamily: 'Verdana, Arial, Sans-serif', fontWeight: 'bold', fill: 0xffffff, fontSize: 14} as PIXI.TextStyle;
        const value: PIXI.Text = new PIXI.Text(text, style);
        this.infoText.addChild(value);
        this.infoText.alignTo(this, {x: 'center', y: 'center'});
        this.infoText.y += 200;
    }

    private createOverlay(): void {
        this.overlay = new Graphics();
        this.overlay.beginFill(0x000000, Constants.DarkOverlayOpacity);
        this.overlay.drawRect(0, 0, this.width, this.height);
        this.overlay.endFill();
        this.addChild(this.overlay);
    }

    public createPausedText(text: string): void {
        this.pausedText = new Graphics();
        this.addChild(this.pausedText);
        const style: PIXI.TextStyle = { fontFamily: 'Verdana, Arial, Sans-serif', fontWeight: 'bold', fill: 0xffffff, fontSize: 14} as PIXI.TextStyle;
        const value: PIXI.Text = new PIXI.Text(text, style);
        this.pausedText.addChild(value);
        this.pausedText.alignTo(this, {x: 'center', y: 'center'});
    }

}