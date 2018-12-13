import {
    BaseModule,
    GameModel,
    GameView,
    GameController
} from '../imports';

export class GameModule extends BaseModule {

    public addBindings(): void {
        this
        .asController(GameController)
        .asModel(GameModel)
        .asView(GameView)
        .bind();
    }

}