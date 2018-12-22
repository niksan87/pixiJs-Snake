export class GridElement {
    public id: string;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public type: GridElementType;
}

export enum GridElementType {
    REWARD = 'REWARD',
    SNAKE = 'SNAKE'
}