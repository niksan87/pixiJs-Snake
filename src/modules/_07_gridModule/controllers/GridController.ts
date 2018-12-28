import {
    BaseController,
    EventsManager,
    BoardModule,
    GameApplication,
    GridView,
    GridElementType,
    GridModel,
    GridConstants,
    RewardConstants,
    SnakeConstants,
} from '../../imports';

export class GridController extends BaseController {
    public view: GridView;
    public model: GridModel;

    public addListeners(): void {
        EventsManager.addListener(GridConstants.EVENTS.GRID_CREATE, () => {
            this.view.addTo(GameApplication.app.modules[BoardModule.name].view);
            this.model.createGridMatrix();
        });
        
        EventsManager.addListener(RewardConstants.EVENTS.REWARD_GET_POSITION, (event: CustomEvent) => {
            this.model.setRandomGridPosition(GridElementType.REWARD, event.detail);    
        });

        EventsManager.addListener(SnakeConstants.EVENTS.SNAKE_GET_POSITION, (event: CustomEvent) => {
            this.model.setRandomGridPosition(GridElementType.SNAKE_TAIL, event.detail);    
        });
    }
}