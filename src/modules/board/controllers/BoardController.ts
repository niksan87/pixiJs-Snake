import {
    BaseController,
    BoardView,
    BoardModel,
    BoardConstants,
    EventsManager,
    GameModule,
    GameView,
    GameApplication,
    GridConstants,
    Utils
} from '../../imports';

export class BoardController extends BaseController {
    public view: BoardView;
    public model: BoardModel;

    protected addListeners(): void {
        EventsManager.addListener(BoardConstants.EVENTS.CREATE_BOARD, () => {
            this.view.addTo(GameApplication.app.modules[GameModule.name].view);
            EventsManager.dispatch(GridConstants.EVENTS.CREATE_GRID);
        });
    }
}