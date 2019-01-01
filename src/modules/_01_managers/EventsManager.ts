import {
    GridElementView,
    SnakeDirection,
    LoaderConstants,
    SnakeConstants,
    RewardConstants,
    Utils
} from '../imports';

export class EventsManager {

    public static dispatch(eventName: string, value?: any): void {
        EventsManager.warnEventInfo(eventName, value);
        document.body.dispatchEvent(new CustomEvent(eventName, { detail: value }));
    }

    public static addListener(eventName: string, callback: EventListenerOrEventListenerObject): void {
        document.body.addEventListener(eventName, callback);
    };

    private static warnEventInfo(eventName: string, value?: any): void {
        let extraText: string = '';
        if (value) {
            if (eventName === LoaderConstants.EVENTS.LOADER_IN_PROGRESS) {
                extraText = `(${((value as number)* 100).toFixed(2)}%)`;
            } else if (eventName === SnakeConstants.EVENTS.SNAKE_SET_NEW_DIRECTION) {
                switch (value) {
                    case SnakeDirection.UP: extraText = '(UP)'; break;
                    case SnakeDirection.RIGHT: extraText = '(RIGHT)'; break;
                    case SnakeDirection.BOTTOM: extraText = '(DOWN)'; break;
                    case SnakeDirection.LEFT: extraText = '(LEFT)'; break;
                }                
            } else if (eventName === RewardConstants.EVENTS.REWARD_GET_POSITION || eventName === SnakeConstants.EVENTS.SNAKE_GET_POSITION) {
                extraText = `(${value === 'true' ? 'WITH' : 'WITHOUT'} SAFE MARGIN)`;
            } else if (eventName === SnakeConstants.EVENTS.SNAKE_GET_LENGTH){
                extraText = '';
            } else if (eventName === SnakeConstants.EVENTS.SNAKE_SEND_LENGTH){
                extraText = `(${value.length})`;
            } else if (value as GridElementView) {
                extraText = `(${(value as GridElementView).matrixXPosition}x${(value as GridElementView).matrixYPosition})`;
            }
        }      
        Utils.warn(`   Event ${eventName}${extraText} dispatched.`);
    }
}