import {
    BaseController,
    SnakeView,
    SnakeModel,
    EventsManager,
    GameModule,
    SnakeConstants,
    Utils
} from '../../imports';

export class SnakeController extends BaseController {
    public view: SnakeView;
    public model: SnakeModel;

    protected addListeners(): void {
        EventsManager.addListener(SnakeConstants.EVENTS.CREATE_SNAKE, () => {
            this.view.addTo(Utils.getModule(GameModule).view);
            
        });
    }
}