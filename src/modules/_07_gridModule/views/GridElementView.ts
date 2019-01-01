import {
    TweenMax,
    Linear
} from "gsap";

import {
    SnakeDirection,
    Constants,
    Utils,
    GameApplication,
    BaseView,
    SnakeConstants,
    GameConstants,
    GridElementType
} from '../../imports';

export class GridElementView extends PIXI.Sprite {
    public initX: number;
    public initY: number;
    public type: GridElementType;
    public direction: SnakeDirection;
    public prevDirection: SnakeDirection;
    public matrixXPosition: number;
    public matrixYPosition: number;
    public matrix: GridElementView[][];
    public nextElementView: GridElementView;

    public move(speed: number, callback?: any): void {
        switch (this.direction) {
            case SnakeDirection.UP: 
            TweenMax.to(this, speed, {y: this.y - this.height, ease: Linear.easeNone, onComplete: callback});
            break;

            case SnakeDirection.RIGHT: 
            TweenMax.to(this, speed, {x: this.x + this.width, ease: Linear.easeNone, onComplete: callback});
            break;

            case SnakeDirection.BOTTOM:
            TweenMax.to(this, speed, {y: this.y + this.height, ease: Linear.easeNone, onComplete: callback});
            break;

            case SnakeDirection.LEFT:
            TweenMax.to(this, speed, {x: this.x - this.width, ease: Linear.easeNone, onComplete: callback});
            break;
        }
    }

    public reset(): void {
        this.alpha = 1;
        this.direction = null;
        this.rotation = 0;
        this.prevDirection = null;
        this.type = null;
        this.x = this.initX;
        this.y = this.initY;
        this.texture = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    public addTo(parent: PIXI.Container | BaseView): GridElementView {
        parent.addChild(this);
        return this;
    }

    public getNextElementView(): GridElementView {
        let nextElement: GridElementView;
        try {
            switch (this.direction) {
                case SnakeDirection.UP: nextElement = this.matrix[this.matrixYPosition - 1][this.matrixXPosition]; break;
                case SnakeDirection.RIGHT: nextElement = this.matrix[this.matrixYPosition][this.matrixXPosition + 1]; break;
                case SnakeDirection.BOTTOM: nextElement = this.matrix[this.matrixYPosition + 1][this.matrixXPosition]; break;
                case SnakeDirection.LEFT: nextElement = this.matrix[this.matrixYPosition][this.matrixXPosition - 1]; break;
            }
        } catch (e) {
            this.nextElementView = null;
        } finally {
            return nextElement; 
        }
    }

    public getPreviousElementView(): GridElementView {
        let previousElement: GridElementView;

        let directionToUse: SnakeDirection = this.direction;

        if (this.prevDirection) {
            directionToUse = this.prevDirection;
        }

        switch (directionToUse) {
            case SnakeDirection.UP: previousElement = this.matrix[this.matrixYPosition + 1][this.matrixXPosition]; break;
            case SnakeDirection.RIGHT: previousElement = this.matrix[this.matrixYPosition][this.matrixXPosition - 1]; break;
            case SnakeDirection.BOTTOM: previousElement = this.matrix[this.matrixYPosition - 1][this.matrixXPosition]; break;
            case SnakeDirection.LEFT: previousElement = this.matrix[this.matrixYPosition][this.matrixXPosition + 1]; break;
        }

        return previousElement;
    }

    public setTexture(texture): GridElementView {
        this.texture = texture;
        return this;
    }

    public setRotation(value?: number): GridElementView {
        this.rotation = 6.28319 * (value !== undefined ? value : this.direction);
        return this;
    }

    public setType(type: GridElementType): GridElementView {
        this.type = type;
        return this;
    }

    public setDirection(direction: SnakeDirection): GridElementView {
        this.direction = direction;
        return this;
    }

    public setPrevDirection(direction: SnakeDirection): GridElementView {
        this.prevDirection = direction;
        return this;
    }

    public setPosition(position): GridElementView {
        this.position = position;
        return this;
    }

    public setRandomDirection(): void {
        const directions: number[] = [];
        for (var direction in SnakeDirection) {
            if (Number(direction)) {
                directions.push(Number(direction));
            }  
        }
        this.direction = directions[Utils.getRandomInt(0, 3)];
    }

    public hasElementNearby(): boolean {
        let output: boolean = false;
        let nearbyGridElementView: GridElementView;
        for (let yPosition = this.matrixYPosition - Constants.ElementsSafeMargin; yPosition < this.matrixYPosition + Constants.ElementsSafeMargin; ++yPosition) {
            for (let xPosition = this.matrixXPosition - Constants.ElementsSafeMargin; xPosition < this.matrixXPosition + Constants.ElementsSafeMargin; ++xPosition) {
                if(this.matrix[yPosition][xPosition].isAlreadyTaken()) {
                    output = true;
                }
            }
        }
        return output;
    }

    public isAlreadyTaken(): boolean {
        let output: boolean = false;
        if (this.type) {
            output = true;
        }
        return output;
    }

    public show(speed: number, callback?: any): void {
        this.alpha = 0;
        this.scale.x = 2;
        this.scale.y = 2;
        TweenMax.to(this, speed, {alpha: 1});
        TweenMax.to(this.scale, speed, {x: 1, y: 1, onComplete: () => {
            if (callback) {
                setTimeout(() => {
                    callback();
                }, 0);
            }
        }});
    }

}