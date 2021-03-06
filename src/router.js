import Controller from './controller';
import ControllerStart from './controllerStart';
import ControllerHome from './controllerHome';

class Router {
    constructor(id) {
      this.user = localStorage.user || null;
      this.rootElement = document.getElementById('page');
      this.Controller = null;
      this.ControllerStart = null;
      this.deckId = id || '';
      
      // Подписаться на событие hashchange
      window.addEventListener('hashchange', this.onhashchange.bind(this));

      if ( document.location.hash === '' && !this.user || document.location.hash === 'start') { 
        this.navigateTo('start');
        } else { if (document.location.hash === '' && this.user || document.location.hash === 'home') {
                this.navigateTo('home');
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
        }  else { if(route === 'home') {    
                if(!this.user) {
                    this.navigateTo('start')    
                } else {
                    this.rootElement.innerHTML = '';
                    this.Controller = new ControllerHome(this.user);
                }            
                
            } else { if(route === 'decks') {    
                if(!this.user) {
                    this.navigateTo('start')    
                } else {
                    this.rootElement.innerHTML = '';
                    this.Controller = new Controller(this.user,this.deckId);
                }        
            }
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