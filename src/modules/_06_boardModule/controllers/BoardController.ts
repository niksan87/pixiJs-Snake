import {
    GameApplication,
    GameModule,
    BaseController,
    BoardView,
    BoardModel,
    EventsManager,
    BoardConstants,
    GridConstants
} from '../../imports';

export class BoardController extends BaseController {
    public view: BoardView;
    public model: BoardModel;

    protected addListeners(): void {
        EventsManager.addListener(BoardConstants.EVENTS.BOARD_CREATE, () => {
            this.view.addTo(GameApplication.app.modules[GameModule.name].view);
            EventsManager.dispatch(GridConstants.EVENTS.GRID_CREATE);
        });
    }
}