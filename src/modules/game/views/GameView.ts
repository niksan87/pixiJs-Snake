import {
    BaseView,
    // BoardModule,
    // BoardView,
    // SnakeModule,
    // SnakeView,
    Utils,
    LoaderModule,
    GameModule,
    GameApplication
} from '../../imports';

export class GameView extends BaseView {

    public addTo(parent: PIXI.Container): void {
        super.addTo(parent);
        GameApplication.app.stage.swapChildren(
            GameApplication.app.modules[LoaderModule.name].view,
            GameApplication.app.modules[GameModule.name].view
            )
    }
}