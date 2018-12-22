import {
    BaseController,
    RewardView,
    RewardModel,
    EventsManager,
    RewardConstants,
    GameApplication,
    GameModule
} from '../../imports';

export class RewardController extends BaseController {
    public view: RewardView;
    public model: RewardModel;

    protected addListeners(): void {
        EventsManager.addListener(RewardConstants.EVENTS.CREATE_REWARDS_VIEW, () => {
            this.view.addTo(GameApplication.app.modules[GameModule.name].view);
        });
        EventsManager.addListener(RewardConstants.EVENTS.CREATE_REWARD, (event: CustomEvent) => {
            this.view.createReward(event.detail);
        });
    }
}