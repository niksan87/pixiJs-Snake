import {
    BaseAction,
    EventsManager,
    GameConstants
} from '../../imports';

export class CreateGameAction extends BaseAction {
    public execute(): Promise<any> {
        EventsManager.addListener(GameConstants.EVENTS.GAME_CREATE_FINISH, () => this.actionResolve());
        EventsManager.dispatch(GameConstants.EVENTS.GAME_CREATE);
        return super.execute();
    }
}