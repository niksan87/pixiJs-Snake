import {
    BaseAction,
    EventsManager,
    GameConstants
} from '../../imports';

export class StartGameAction extends BaseAction {
    constructor() {
        super();
        this.startEvent = GameConstants.EVENTS.GAME_START;
        this.finishEvent = GameConstants.EVENTS.GAME_END;
    }
}