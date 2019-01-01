import {
    BaseAction,
    EventsManager,
    GameConstants
} from '../../imports';

export class CreateGameAction extends BaseAction {
    constructor() {
        super();
        this.startEvent = GameConstants.EVENTS.GAME_CREATE;
        this.finishEvent = GameConstants.EVENTS.GAME_CREATE_FINISH;
    }
}