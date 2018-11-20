import Controller from './controller';
import ControllerStart from './controllerStart';


const activeHash = document.location.hash;


class Router {
    constructor() {
      this.rootElement = document.getElementById('page');
      this.Controller = null;
      this.ControllerStart = null;
      
      // Подписаться на событие hashchange
      window.addEventListener('hashchange', this.onhashchange.bind(this));

      if (!localStorage.user) { //!localStorage.user - при пустом попадаем на промо
        this.navigateTo('#start');
        } else {
            this.navigateTo('#decks');
        }
    }

    onhashchange(e) {
      const activeHash = document.location.hash;
      // Отрисовать страницу для нового адреса
      this._route(activeHash);
    }

    _route(route) {
        route = route.substr(1);
        if (route === 'start') {        
            this.rootElement.innerHTML = '';
            this.ControllerStart = new ControllerStart();
        }  else { if(route === 'decks') {                  
                this.rootElement.innerHTML = '';
                this.Controller = new Controller();
            }            
        }
    }

    navigateTo(route) {
        route = route.substr(1);
      // Выполнить начальную навигацию на адрес по умолчанию
      if (document.location.hash === route && this.loaded) return;
      this._route(route);
      document.location.hash = route;
      this.loaded = true;
    }
  }
 
  
  export default Router;