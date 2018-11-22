import Controller from './controller';
import ControllerStart from './controllerStart';

class Router {
    constructor() {
      this.user = localStorage.user || null;
      this.rootElement = document.getElementById('page');
      this.Controller = null;
      this.ControllerStart = null;
      
      // Подписаться на событие hashchange
      window.addEventListener('hashchange', this.onhashchange.bind(this));

      if ( document.location.hash === '' && !this.user || document.location.hash === 'start') { 
        this.navigateTo('start');
        } else { if (document.location.hash === '' && this.user || document.location.hash === 'decks') {
                this.navigateTo('decks');
            } else {
                this.navigateTo(document.location.hash);
            }            
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
            this.ControllerStart.on('changeUser', this.changeUser.bind(this))
        }  else { if(route === 'decks') {    
                if(!this.user) return;             
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
        localStorage.user = user;
        this.user = user;
    }
  }
 
  
  export default Router;