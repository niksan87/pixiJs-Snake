export class BaseAction {
    protected actionResolve: any;
    protected nextAction: BaseAction;
    
    public execute(): Promise<any> {
        return new Promise((resolve) => {
            this.actionResolve = resolve;
        });
    }
}