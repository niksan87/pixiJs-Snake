import {
    Constants,
    GameApplication,
    BaseView
} from '../modules/imports';

export class PositionManager {

    public static set(positionSettings: IPositionSettings): void {
        if (!positionSettings.alignment.x && !positionSettings.alignment.y) {
            console.error(`Missing parameters to execute function.`);
            return;
        }

        const elementToPosition = positionSettings.elementToPosition;
        const elementToPositionTo = positionSettings.elementToPositionTo;

        if (positionSettings.alignment.x) {
            switch (positionSettings.alignment.x) {
                case "left": elementToPosition.x = positionSettings.elementToPositionTo.x; break;
                case "right": elementToPosition.x = elementToPositionTo.x + elementToPositionTo.width - elementToPosition.width; break;
                case "center": elementToPosition.x = elementToPositionTo.x + elementToPositionTo.width / 2 - elementToPosition.width / 2; break;
            }
        }

        if (positionSettings.alignment.y) {
            switch (positionSettings.alignment.y) {
                case "top": elementToPosition.y = positionSettings.elementToPositionTo.y; break;
                case "bottom": elementToPosition.y = elementToPositionTo.y + elementToPositionTo.height - elementToPosition.height; break;
                case "center": elementToPosition.y = elementToPositionTo.y + elementToPositionTo.height / 2 - elementToPosition.height / 2; break;
            }
        }
    }
}

export interface IAlignment {
    x?: 'left' | 'right' | 'center',
    y?: 'top' | 'bottom' | 'center'
}

export interface IPositionSettings {
    elementToPosition: PIXI.Container | PIXI.Graphics;
    elementToPositionTo: PIXI.Rectangle | PIXI.Container | PIXI.Graphics;
    alignment: IAlignment;
}