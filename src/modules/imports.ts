// Attach PIXI to window for accesibility
import * as PIXI from 'pixi.js';
(window as any).PIXI = PIXI;
PIXI.utils.skipHello();

/** Internal exports */
export * from './GameApplication';
export * from './constants';

// Misc
export * from './_00_misc/Animate';
export * from './_00_misc/Graphics';
export * from './_00_misc/Button';
export * from './_00_misc/Interfaces';
export * from './_00_misc/Utils';

// Managers
export * from './_01_managers/ActionsManager';
export * from './_01_managers/AnimationsManager';
export * from './_01_managers/EventsManager';

// Base
export * from './_03_baseModule/BaseModule';
export * from './_03_baseModule/models/BaseModel';
export * from './_03_baseModule/views/BaseView';
export * from './_03_baseModule/controllers/BaseController';
export * from './_03_baseModule/actions/BaseAction';

// Loader
export * from './_04_loaderModule/LoaderModule';
export * from './_04_loaderModule/models/LoaderModel';
export * from './_04_loaderModule/views/LoaderView';
export * from './_04_loaderModule/controllers/LoaderController';
export * from './_04_loaderModule/actions/LoadAssetsAction';
export * from './_04_loaderModule/constants/LoaderConstants';

// Game
export * from './_05_gameModule/GameModule';
export * from './_05_gameModule/models/GameModel';
export * from './_05_gameModule/views/GameView';
export * from './_05_gameModule/views/InitialScreenView';
export * from './_05_gameModule/views/PauseGameView';
export * from './_05_gameModule/views/GameOverView';
export * from './_05_gameModule/controllers/GameController';
export * from './_05_gameModule/actions/CreateGameAction';
export * from './_05_gameModule/actions/StartGameAction';
export * from './_05_gameModule/constants/GameConstants';

// Board
export * from './_06_boardModule/BoardModule';
export * from './_06_boardModule/models/BoardModel';
export * from './_06_boardModule/views/BoardView';
export * from './_06_boardModule/views/BackgroundView';
export * from './_06_boardModule/views/SnowView';
export * from './_06_boardModule/controllers/BoardController';
export * from './_06_boardModule/constants/BoardConstants';

// Grid element
export * from './_07_gridModule/GridModule';
export * from './_07_gridModule/models/GridModel';
export * from './_07_gridModule/views/GridView';
export * from './_07_gridModule/views/GridElementView';
export * from './_07_gridModule/controllers/GridController';
export * from './_07_gridModule/constants/GridConstants';

// Reward
export * from './_08_rewardModule/RewardModule';
export * from './_08_rewardModule/models/RewardModel';
export * from './_08_rewardModule/views/RewardView';
export * from './_08_rewardModule/controllers/RewardController';
export * from './_08_rewardModule/constants/RewardConstants';

// Snake
export * from './_09_snakeModule/SnakeModule';
export * from './_09_snakeModule/models/SnakeModel';
export * from './_09_snakeModule/views/SnakeView';
export * from './_09_snakeModule/controllers/SnakeController';
export * from './_09_snakeModule/constants/SnakeConstants';
export * from './_09_snakeModule/constants/SnakeDirection';
