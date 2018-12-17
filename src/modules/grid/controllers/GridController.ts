import {
    BaseController,
    EventsManager,
    GridConstants,
    BoardModule,
    Utils
} from '../../imports';

export class GridController extends BaseController {
    public addListeners(): void {
        EventsManager.addListener(GridConstants.EVENTS.CREATE_GRID, () => {
            this.view.addTo(Utils.getModule(BoardModule).view);
        });
    }
}