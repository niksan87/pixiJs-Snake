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
        this.actions[index].execute().then(() => {
            this.executeAction(++index);
        });
    }
}