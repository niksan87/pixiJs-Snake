import {
    BaseModule,
    LoaderModule,
    BoardModule,
    RewardModule,
    GridModule,
    GameModule,
    SnakeModule,
    LoadAssetsAction,
    CreateGameAction,
    StartGameAction,
    ActionsManager,
    IAssociativeArray,
    IConstructable,
    Constants
} from './imports'

export class GameApplication extends PIXI.Application {
    public static app: GameApplication;
    public modules: IAssociativeArray = {};

    constructor() {
        super(Constants.AppSettings);
        this.setAppInstance();
        this.createCanvas();
        this.initModules();
        this.startActions();
    }

    private setAppInstance(): void {
        GameApplication.app = this;
    }

    private createCanvas(): void {
        document.body.appendChild(this.view);
    };

    public initModules(): void {
        [
            LoaderModule,
            GameModule,
            BoardModule,
            GridModule,
            RewardModule,
            SnakeModule
        ].forEach((Module: IConstructable<BaseModule>) => this.modules[Module.name] = new Module());
    }

    private startActions(): void {
        ActionsManager.execute([
            LoadAssetsAction,
            CreateGameAction,
            StartGameAction,
            //EndGameAction
        ]);
    }
}