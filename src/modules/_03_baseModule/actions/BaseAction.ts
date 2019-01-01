import{
    EventsManager,
    ActionsManager
} from '../../imports';

export class BaseAction {
    protected startEvent: string;
    protected finishEvent: string;
    public nextAction: BaseAction;
    public prevAction: BaseAction;
    public executed: boolean;
    public executing: boolean;
    
    public execute(): Promise<any> {
        return new Promise((resolve) => {
            EventsManager.addListener('START_NEXT_ACTION', () => {
                setTimeout(() => {ActionsManager.executeAction(this.nextAction);}, 0);
            });
            this.executing = true;
            EventsManager.addListener(this.finishEvent, () => {
                this.executing = false;
                this.executed = true;
                resolve();
            });
            EventsManager.dispatch(this.startEvent);
        });
    }
}