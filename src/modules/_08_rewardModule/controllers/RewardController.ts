import {
    GameApplication,
    BaseController,
    RewardView,
    RewardModel,
    EventsManager,
    GameModule,
    RewardConstants
} from '../../imports';

export class RewardController extends BaseController {
    public view: RewardView;
    public model: RewardModel;

    protected addListeners(): void {
        EventsManager.addListener(RewardConstants.EVENTS.REWARD_CREATE, () => {
            if (!this.view.parent) {
                this.view.addTo(GameApplication.app.modules[GameModule.name].view);
            }
            EventsManager.dispatch(RewardConstants.EVENTS.REWARD_GET_POSITION, 'true');
        });

        EventsManager.addListener(RewardConstants.EVENTS.REWARD_SET_POSITION, (event: CustomEvent) => {
            this.view.createReward(event.detail);    
        });
    }
}