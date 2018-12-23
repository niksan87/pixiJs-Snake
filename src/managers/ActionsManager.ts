import {
    BaseAction
} from '../modules/imports';

export class ActionsManager {
    private static actions: Array<BaseAction>;

    public static execute(actions: Array<BaseAction>): void {
        this.actions = actions;
        this.executeAction(0);
    }

    private static executeAction(index: number): void {
        if (!this.actions[index]) {
            return;
        }
        const actionName: string = this.actions[index].constructor.name;
        console.warn(`-> ${actionName} started.`);
        this.actions[index].execute().then(() => {
            console.warn(`<- ${actionName} ended.`);
            this.executeAction(++index);
        });
    }
}