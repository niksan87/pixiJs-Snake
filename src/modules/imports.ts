// Attach PIXI to window for accesibility
import * as PIXI from 'pixi.js';
(window as any).PIXI = PIXI;

/** Internal exports */
export * from './GameApplication';
export * from './constants';
export * from '../managers/Utils';
export * from '../managers/ActionsManager';
export * from '../managers/AnimationsManager';
export * from '../managers/EventsManager';
export * from '../managers/PositionManager';

// Base
export * from './baseModule/BaseModule';
export * from './baseModule/models/BaseModel';
export * from './baseModule/views/BaseView';
export * from './baseModule/controllers/BaseController';
export * from './baseModule/actions/BaseAction';
export * from './baseModule/interfaces/IConstructable'

// Loader
export * from './loader/LoaderModule';
export * from './loader/models/LoaderModel';
export * from './loader/views/LoaderView';
export * from './loader/controllers/LoaderController';
export * from './loader/actions/LoadAssetsAction';
export * from './loader/constants/LoaderConstants';

// Game
export * from './game/GameModule';
export * from './game/models/GameModel';
export * from './game/views/GameView';
export * from './game/controllers/GameController';
export * from './game/actions/CreateGameAction';
export * from './game/constants/GameConstants';

// Board
export * from './board/BoardModule';
export * from './board/models/BoardModel';
export * from './board/views/BoardView';
export * from './board/controllers/BoardController';
export * from './board/constants/BoardConstants';

// Grid element
export * from './grid/GridModule';
export * from './grid/models/GridModel';
export * from './grid/views/GridView';
export * from './grid/controllers/GridController';
export * from './grid/constants/GridConstants';

// Snake
export * from './snake/SnakeModule';
export * from './snake/models/SnakeModel';
export * from './snake/views/SnakeView';
export * from './snake/controllers/SnakeController';
export * from './snake/constants/SnakeConstants';

// Reward
export * from './reward/RewardModule';
export * from './reward/models/RewardModel';
export * from './reward/views/RewardView';
export * from './reward/controllers/RewardController';
