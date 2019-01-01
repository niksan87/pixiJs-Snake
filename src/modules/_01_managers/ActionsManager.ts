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
        this.trytoExecuteAction(0);
    }

    private static trytoExecuteAction(index: number): void {
        const action: BaseAction = this.actions[index]
        if (!action) {
            return;
        }

        this.setNextAction(action, index);
        this.setPrevAction(action, index);

        if (action.executing) {
            return;
        } else {
            this.executeAction(action, ++index);
        }
    }

    private static setNextAction(action: BaseAction, index: number): void {
        if (this.actions[index + 1]) {
            action.nextAction = this.actions[index + 1];
        }
    }

    private static setPrevAction(action: BaseAction, index: number): void {
        if (this.actions[index - 1]) {
            action.prevAction = this.actions[index - 1];
        }
    }

    public static executeAction(action: BaseAction, index?: number): void {
        if (action.executed) {
            return ;
        }
        const actionName: string = action.constructor.name;
        Utils.warn(`---${actionName} start---`);
        action.execute().then(() => {
            Utils.warn(`---${actionName} end---`);
            if (index) {
                this.trytoExecuteAction(index);
            }      
        });
    }
}