import Controller from './controller';
import ControllerStart from './controllerStart';

class Router {
    constructor(map, rootElement) {
      this.map = map;
      this.rootElement = rootElement;
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
    '#clock1': {
      pageName:'Test page 1',
      runController: rootElement => {
        new Controller(
          new Model("Test page 1"),
          new View(rootElement));
      }
    },
    '#clock2': {
      pageName:'Test page 2',
      runController: rootElement => {
        new Controller(
          new Model("Test page 2"),
          new View(rootElement));
      }
    },
    '#clock3': {
      pageName:'Test page 3',
      runController: rootElement => {
        new Controller(
          new Model("Test page 3"),
          new View(rootElement));
      }
    }
  }, document.body).navigateTo('#clock2');

  export default Router;