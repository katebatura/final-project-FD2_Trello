import Controller from './controller';
import ControllerStart from './controllerStart';


class Router {
    constructor() {
      this.user = null;
      this.rootElement = document.getElementById('page');
      this.Controller = null;
      this.ControllerStart = null;
      
      // Подписаться на событие hashchange
      window.addEventListener('hashchange', this.onhashchange.bind(this));

      if (document.location.hash === 'start' || document.location.hash === '') { 
        this.navigateTo('start');
        } else {
            this.navigateTo(document.location.hash);
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
            this.user = null;      
            this.rootElement.innerHTML = '';
            this.ControllerStart = new ControllerStart();
            this.ControllerStart.on('changeUser', this.changeUser.bind(this))
        }  else { if(route === 'decks') {                  
                this.rootElement.innerHTML = '';
                this.Controller = new Controller(this.user);
            }            
        }
    }

    navigateTo(route) {
      // Выполнить начальную навигацию на адрес по умолчанию
      if (document.location.hash === route && this.loaded) return;
      this._route(route);
      document.location.hash = route;
      this.loaded = true;
    }

    changeUser(user) {
        this.user = user;
    }
  }
 
  
  export default Router;