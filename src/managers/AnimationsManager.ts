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
    tweenSettings: ITweenSettings;
}

export class AnimationsManager {
    private static animAlpha: TweenLite;
    private static animX: TweenLite;
    private static animY: TweenLite;
    private static animWidth: TweenLite;
    private static animHeight: TweenLite;

    public static show(element: BaseView, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                alpha: 1,
                onComplete: callBack
            },
        }

        if (this.animAlpha) {
            this.animAlpha.kill()
        };

        this.animAlpha = this.animate(animationInfo);
    };

    public static hide(element: BaseView, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                alpha: 0,
                onComplete: callBack
            }
        }

        if (this.animAlpha) {
            this.animAlpha.kill()
        };

        this.animAlpha = this.animate(animationInfo);
    };

    public static x(element: any, x: number, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                x: x,
                onComplete: callBack
            }
        }

        if (this.animX) {
            this.animX.kill()
        };

        this.animX = this.animate(animationInfo);
    }

    public static y(element: any, y: number, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                y: y,
                onComplete: callBack
            }
        }

        if (this.animY) {
            this.animY.kill()
        };

        this.animY = this.animate(animationInfo);
    }

    public static width(element: any, width: number, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                width: width,
                onComplete: callBack
            }
        }

        if (this.animWidth) {
            this.animWidth.kill()
        };
        
        this.animWidth = this.animate(animationInfo);
    };

    public static height(element: any, height: number, callBack?: Function): void {
        const animationInfo: IAnimationInfo = {
            element: element,
            tweenSettings: {
                height: height,
                onComplete: callBack
            }
        }

        if (this.animHeight) {
            this.animHeight.kill()
        };
        this.animHeight = this.animate(animationInfo);
    };

    private static animate(animationInfo: IAnimationInfo): TweenLite {
        return TweenLite.to(animationInfo.element, Constants.Animations.Duration, animationInfo.tweenSettings);
    }

}