import {
    TweenLite
} from "gsap";

import {
    BaseView,
    Constants
} from '../modules/imports';

export interface ITweenSettings {
    alpha?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    onComplete?: Function;
}

export interface IAnimationInfo {
    element: any;
    pivot?: {
        x: number;
        y: number;
    },
    tweenSettings: ITweenSettings;
}

export class AnimationsManager {
    private animations: any[] = [];

    public show(element: BaseView, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                alpha: 1,
                onComplete: callBack
            },
        }

        this.animations.push(this.animate(animationInfo));
    };

    public hide(element: BaseView, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                alpha: 0,
                onComplete: callBack
            }
        }

        this.animations.push(this.animate(animationInfo));
    };

    public x(element: any, x: number, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                x: x,
                onComplete: callBack
            }
        }
        this.animations.push(this.animate(animationInfo));
    }

    public y(element: any, y: number, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                y: y,
                onComplete: callBack
            }
        }
        this.animations.push(this.animate(animationInfo));
    }

    public width(element: any, width: number, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                width: width,
                onComplete: callBack
            }
        }
        this.animations.push(this.animate(animationInfo));
    };

    public height(element: any, height: number, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                height: height,
                onComplete: callBack
            }
        }
        this.animations.push(this.animate(animationInfo));
    };

    private animate(animationInfo: IAnimationInfo): TweenLite {

        return TweenLite.to(animationInfo.element, Constants.Animations.Duration, animationInfo.tweenSettings);
    }

}