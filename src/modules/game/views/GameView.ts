import {
    BaseView
} from '../../imports';

export class GameView extends BaseView {
    constructor() {
        super();
    }

    public hello(): void {
        alert('hello.');
    }
}