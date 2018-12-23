import {
    BaseAction,
    EventsManager,
    GameConstants
} from '../../imports';

export class CreateGameAction extends BaseAction {
    public execute(): Promise<any> {
        EventsManager.addListener(GameConstants.EVENTS.GAME_CREATED, () => this.actionResolve());
        EventsManager.dispatch(GameConstants.EVENTS.CREATE_GAME);
        return super.execute();
    }
}