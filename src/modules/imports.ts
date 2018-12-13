// Attach PIXI to window for accesibility
import * as PIXI from 'pixi.js';
(<any>window).PIXI = PIXI;

// Modules exports
export * from './baseModule/BaseModule';
export * from './baseModule/models/BaseModel';
export * from './baseModule/views/BaseView';
export * from './baseModule/controllers/BaseController';
export * from './baseModule/interfaces/IConstructable'

export * from './game/gameModule';
export * from './game/models/GameModel';
export * from './game/views/GameView';
export * from './game/controllers/GameController';
