import {
    BaseModule,
    RewardModel,
    RewardView,
    RewardController
} from '../imports';

export class RewardModule extends BaseModule {

    public addBindings(): void {
        this
        .asModel(RewardModel)
        .asView(RewardView)
        .asController(RewardController)
        .bind();
    }

}