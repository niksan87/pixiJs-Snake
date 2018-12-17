import {
    BaseModule,
    LoaderModule,
    GameModule,
    ActionsManager,
    LoadAssetsAction,
    Constants,
    IConstructable,
    CreateGameAction,
    BoardModule,
    SnakeModule,
    GridModule,
    IAssociativeArray,
    Utils
} from './imports';

export class GameApplication extends PIXI.Application {
    public modules: IAssociativeArray;

    constructor() {
        super(Constants.AppSettings);
        (window[Constants.AppName] as GameApplication) = this;
        this.createCanvas();
        this.addModules();
        this.init();
    }

    private createCanvas(): void {
        document.body.appendChild(this.view);
    };

    public addModules(): void {
        const modules: Array<IConstructable<BaseModule>> = [
            LoaderModule,
            GameModule,
            BoardModule,
            SnakeModule,
            GridModule
        ];
        this.modules = Utils.convertToAssociativeArray(modules);
    }

    private init(): void {
        ActionsManager.execute([
            new LoadAssetsAction(),
            new CreateGameAction()
        ]);
    }
}