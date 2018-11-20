import Controller from './controller';
import ControllerStart from './controllerStart';

  
const page = document.getElementById('page');
const activeHash = document.location.hash;


class Router {
    constructor(map, rootElement) {
      this.map = map;
      this.rootElement = rootElement;
      this.controller = new ControllerStart();
      this.controller.on('changeHash', this._route.bind(this))
      
      // Подписаться на событие hashchange
      window.addEventListener('hashchange', this.onhashchange.bind(this));
    }

    onhashchange(e) {
      const activeHash = document.location.hash;
      // Отрисовать страницу для нового адреса
      this._route(activeHash);
    }

    _route(route) {
      const settings = this.map[route];
      if (settings) {
        this.rootElement.innerHTML = '';
        // запустить контроллер страницы,
        // которая соответствует адресу,
        // на который нужно перейти
        settings.runController(this.rootElement);
      }
    }

    navigateTo(route) {
      // Выполнить начальную навигацию на адрес по умолчанию
      if (document.location.hash === route && this.loaded) return;
      this._route(route);
      document.location.hash = route;
      this.loaded = true;
    }
  }
 

new Router({
    '#start': {
      pageName:'start',
      runController: rootElement => {
        var a = new ControllerStart();
      }
    },
    activeHash: {
      pageName:'decks',
      runController: rootElement => {
        new Controller();
      }
    }
  }, page).navigateTo(activeHash);

  export default Router;