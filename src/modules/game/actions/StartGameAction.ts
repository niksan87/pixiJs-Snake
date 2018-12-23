import {
    BaseAction,
    EventsManager,
    GameConstants
} from '../../imports';

export class StartGameAction extends BaseAction {
    public execute(): Promise<any> {
        EventsManager.addListener(GameConstants.EVENTS.END_GAME, () => this.actionResolve());
        EventsManager.dispatch(GameConstants.EVENTS.START_GAME);
        return super.execute();
    }
}