import {
    Animate,
    IAlignment,
    Utils
} from '../imports';

export class Graphics extends PIXI.Graphics {

    private _animate: Animate;

    constructor() {
        super();
        this._animate = new Animate(this);
    }

    public setAnchor(x: number, y: number): void {
        if (x < 0 || x > 1 || y < 0 || y > 1) {
            Utils.error(`Invalid anchor value.`);
            return;
        }
        this.pivot.x = this.width * x;
        this.pivot.y = this.height * y;
    }

    public alignTo(element: PIXI.Rectangle | PIXI.Container | PIXI.Graphics, alignment: IAlignment): void {
        if (!alignment.x && !alignment.y) {
            Utils.error(`Missing parameters to execute alignment.`);
            return;
        }

        if (alignment.x) {
            switch (alignment.x) {
                case "left": this.x = element.x + this.pivot.x; break;
                case "right": this.x = element.x + element.width - this.width + this.pivot.x; break;
                case "center": this.x = element.x + element.width / 2 - this.width / 2 + this.pivot.x; break;
            }
        }

        if (alignment.y) {
            switch (alignment.y) {
                case "top": this.y = element.y + this.pivot.y; break;
                case "bottom": this.y = element.y + element.height - this.height + this.pivot.y; break;
                case "center": this.y = element.y + element.height / 2 - this.height / 2 + this.pivot.y; break;
            }
        }
    }

    get animate(): Animate {
        return this._animate;
    }
}