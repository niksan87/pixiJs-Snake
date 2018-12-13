import {
    GameModule
} from './modules/imports';

window.onload = () => window['game'] = new GameModule();