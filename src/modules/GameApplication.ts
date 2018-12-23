import {
    IAssociativeArray,
    IConstructable,
    BaseModule,
    LoaderModule,
    ActionsManager,
    LoadAssetsAction,
    Constants,
    CreateGameAction,
    BoardModule,
    RewardModule,
    GridModule,
    GameModule,
    SnakeModule,
    StartGameAction,
    Utils
} from './imports';

export class GameApplication extends PIXI.Application {
    public static app: GameApplication;
    public modules: IAssociativeArray;

    constructor() {
        super(Constants.AppSettings);
        this.setAppInstance();
        this.createCanvas();
        this.initModules();
        this.startActions();
        console.warn(this);
    }

    private setAppInstance(): void {
        GameApplication.app = this;
    }

    private createCanvas(): void {
        document.body.appendChild(this.view);
    };

    public initModules(): void {
        const modules: Array<IConstructable<BaseModule>> = [
            LoaderModule,
            GameModule,
            BoardModule,
            GridModule,
            RewardModule,
            SnakeModule            
        ];
        this.modules = {};
        modules.forEach((Module: IConstructable<BaseModule>) => this.modules[Module.name] = new Module());
    }

    private startActions(): void {
        ActionsManager.execute([
            new LoadAssetsAction(),
            new CreateGameAction(),
            new StartGameAction()
        ]);
    }
}