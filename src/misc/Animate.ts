import {
    TweenLite
} from "gsap";

import {
    Constants,
    Graphics
} from '../modules/imports';

export class Animate {
    private animations: TweenLite[];
    private element: Graphics

    constructor(element: Graphics) {
        this.animations = [];
        this.element = element;
    }

    public width(widthToAnimateTo: number, duration: number = Constants.Animations.Duration): Promise<any> {
        return new Promise((resolve) => {
            this.animations.push(TweenLite.to(this.element, duration, { width: widthToAnimateTo, onComplete: resolve }));
        });
    }

    public height(heightToAnimateTo: number, duration: number = Constants.Animations.Duration): Promise<any> {
        return new Promise((resolve) => {
            this.animations.push(TweenLite.to(this.element, duration, { height: heightToAnimateTo, onComplete: resolve }));
        });
    }
}