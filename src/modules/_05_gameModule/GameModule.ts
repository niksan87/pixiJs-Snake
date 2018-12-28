import {
    BaseModule,
    GameModel,
    GameView,
    GameController
} from '../imports';

export class GameModule extends BaseModule {

    public addBindings(): void {
        this
        .asModel(GameModel)
        .asView(GameView)
        .asController(GameController)
        .bind();
    }

}