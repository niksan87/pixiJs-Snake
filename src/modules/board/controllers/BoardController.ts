import {
    BaseController,
    BoardView,
    BoardModel,
    BoardConstants,
    EventsManager,
    GameModule,
    GridConstants,
    Utils
} from '../../imports';

export class BoardController extends BaseController {
    public view: BoardView;
    public model: BoardModel;

    protected addListeners(): void {
        EventsManager.addListener(BoardConstants.EVENTS.CREATE_BOARD, () => {
            this.view.addTo(Utils.getModule(GameModule).view);
            EventsManager.dispatch(GridConstants.EVENTS.CREATE_GRID);
        });
    }
}