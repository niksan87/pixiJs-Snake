import {
    BaseModule,
    IAssociativeArray,
    IConstructable
} from '../modules/imports';

export class Utils {
    public static convertToAssociativeArray(array: Array<IConstructable<BaseModule>>): IAssociativeArray {
        let output: IAssociativeArray = {};
        array.forEach((Element: IConstructable<BaseModule>) => output[Element.name] = new Element());
        return output;
    };
}