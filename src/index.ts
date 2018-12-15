import {
    GameApplication,
    Constants
} from './modules/imports';

window.onload = () => {
    new GameApplication();
    console.log(window[Constants.AppName]);
};