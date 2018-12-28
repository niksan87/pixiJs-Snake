import {
    BaseAction,
    Utils,
    IConstructable
} from '../imports';

export class ActionsManager {
    private static actions: Array<BaseAction>;

    public static execute(actions: Array<IConstructable<BaseAction>>): void {
        this.actions = [];
        actions.forEach((Action: IConstructable<BaseAction>) => this.actions.push(new Action()));
        this.executeAction(0);
    }

    private static executeAction(index: number): void {
        if (!this.actions[index]) {
            ActionsManager.actions = null;
            return;
        }
        const actionName: string = this.actions[index].constructor.name;
        Utils.warn(`---${actionName} start---`);
        this.actions[index].execute().then(() => {
            Utils.warn(`---${actionName} end---\n\n`);
            this.executeAction(++index);
        });
    }
}