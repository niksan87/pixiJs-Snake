import {
    BaseController,
    EventsManager,
    GridConstants,
    BoardModule,
    Utils,
    GameApplication,
    GridView,
    RewardConstants,
    SnakeConstants,
    GridModel
} from '../../imports';

export class GridController extends BaseController {
    public view: GridView;
    public model: GridModel;

    public addListeners(): void {
        EventsManager.addListener(GridConstants.EVENTS.CREATE_GRID, () => {
            this.view.addTo(GameApplication.app.modules[BoardModule.name].view);
            this.model.createGridMatrix();
        });

        EventsManager.addListener(RewardConstants.EVENTS.GET_REWARD_POSITION, () => {
            this.model.getRewardPosition();
        });

        EventsManager.addListener(SnakeConstants.EVENTS.GET_SNAKE_POSITION, (event: CustomEvent) => {
            this.model.getSnakePositions(event.detail);
        });

    }
}