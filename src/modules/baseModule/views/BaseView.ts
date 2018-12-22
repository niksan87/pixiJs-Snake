import {
    GameApplication,
    BaseModel,
    Constants,
    Utils
} from '../../imports';

export class BaseView extends PIXI.Container {

    public addTo(parent: PIXI.Container | BaseView): void {
        parent.addChild(this);
    }

    public remove(): void {
        this.parent.removeChild(this);
    }
}