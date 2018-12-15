export class EventsManager {
    private static event: Event;

    public static dispatch(eventName: string, detail?: Object): void {
        EventsManager.createEvent(eventName, detail);
        document.body.dispatchEvent(EventsManager.event);
    }

    public static addListener(eventName: string, callback: EventListenerOrEventListenerObject): void {
        document.body.addEventListener(eventName, callback);
    };

    private static createEvent(eventName: string, detail?: Object): void {
        EventsManager.event = new CustomEvent(eventName, detail);
    }
}