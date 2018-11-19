import Router from './router';
import Controller from './controller';
import ControllerStart from './controllerStart';

const page = document.getElementById('page');
const activeHash = document.location.hash;

new Router({
    '#start': {
      pageName:'start',
      runController: rootElement => {
        new ControllerStart()
      }
    },
    '#decks': {
      pageName:'decks',
      runController: rootElement => {
        new Controller();
      }
    }
  }, page).navigateTo(activeHash);