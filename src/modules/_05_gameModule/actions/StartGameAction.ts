import {
    BaseAction,
    EventsManager,
    GameConstants
} from '../../imports';

export class StartGameAction extends BaseAction {
    public execute(): Promise<any> {
        EventsManager.addListener(GameConstants.EVENTS.GAME_END, () => this.actionResolve());
        setTimeout(() => {EventsManager.dispatch(GameConstants.EVENTS.GAME_START);}, 2000);
        return super.execute();
    }
}