import {
    BaseModule,
    IAssociativeArray,
    IConstructable,
    Constants,
    GameApplication
} from '../modules/imports';

export class Utils {
    
    public static getModule(Module: IConstructable<BaseModule>): BaseModule{
        return window[Constants.AppName].modules[Module.name];
    }

    public static getApplication(): GameApplication{
        return (window[Constants.AppName] as GameApplication);
    }

    public static getObjectLenght(obj: Object): number{
        let size: number = 0
        let key: string;
        for (key in obj) if (obj.hasOwnProperty(key)) size++;
            return size;
    }

    public static createTwoDImensionalArray(xLenght: number, yLenght: number, DefaultElement: IConstructable<any>): Array<Array<any>> {
        let arrX: Array<any>;
        
        const output: Array<Array<any>> = new Array<Array<any>>();
        for (var y = 0; y < yLenght; y++) {
            arrX = new Array<any>();
            for (var x = 0; x < xLenght; x++) {
                arrX.push(new DefaultElement());
            }
            output.push(arrX);
        }
        return output;
    }
}


export interface IAssociativeArray {
    [key: string]: BaseModule;
}