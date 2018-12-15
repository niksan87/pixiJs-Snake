import {
    BaseController,
    BoardView,
    BoardModel,
    BoardConstants,
    EventsManager,
    GameModule
} from '../../imports';

export class BoardController extends BaseController {
    public view: BoardView;
    public model: BoardModel;

    protected addListeners(): void {
        EventsManager.addListener(BoardConstants.EVENTS.CREATE_BOARD, () => {
            this.view.addTo(this.view.app.modules[GameModule.name].view);
        });
    }
}