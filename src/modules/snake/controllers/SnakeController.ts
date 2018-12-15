import {
    BaseController,
    SnakeView,
    SnakeModel,
    EventsManager,
    GameModule,
    SnakeConstants
} from '../../imports';

export class SnakeController extends BaseController {
    public view: SnakeView;
    public model: SnakeModel;

    protected addListeners(): void {
        EventsManager.addListener(SnakeConstants.EVENTS.CREATE_SNAKE, () => {
            this.view.addTo(this.view.app.modules[GameModule.name].view);
        });
    }
}