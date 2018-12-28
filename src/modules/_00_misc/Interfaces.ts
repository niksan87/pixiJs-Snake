import {
    BaseModule
} from '../imports';

export interface IAssociativeArray {
    [key: string]: BaseModule;
}

export interface IAlignment {
    x?: 'left' | 'right' | 'center',
    y?: 'top' | 'bottom' | 'center'
}

export interface IConstructable<T> {
    new() : T;
}

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