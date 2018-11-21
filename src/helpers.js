function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => {
        if (key.startsWith('data-')) {
            element.setAttribute(key, props[key]);
        } else {
            element[key] = props[key];
        }
    });
    children.forEach(child => {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }

        element.appendChild(child);

    });

    return element;
}

class EventEmitter {//аналог PubSub
    constructor() {
        this.events = {};
    }

    on(type, listener) {//subscribe
        this.events[type] = this.events[type] || [];
        this.events[type].push(listener);
    }

    emit(type, arg) {//publish
        if (this.events[type]) {
            this.events[type].forEach(listener => listener(arg));
        }
    }
}
function saveDeck(state,user) {
    const currentState = load(user);
    const newState = currentState.map(item => {
        if (state.id === item.id) {
            return {
                id: item.id,
                title: state.title,
                lines: state.items,
            }
        }
        return item;
    })
    const string = JSON.stringify(newState);
    localStorage.setItem(user, string);
}

function deleteDeck(id,user) {
    const currentState = load(user);
    const newState = currentState.filter(item => id !== item.id);
    const string = JSON.stringify(newState);
    localStorage.setItem(user, string);
}

function changeDeckList(newState,user) {
    const string = JSON.stringify(newState);
    localStorage.setItem(user, string);
}

function save(data,user) {
    const string = JSON.stringify(data);
    localStorage.setItem(user, string);
    localStorage.setItem('user', user);
}

function load(user) {
    const string = localStorage.getItem(user);
    const data = JSON.parse(string);
    return data;
}





export { createElement, EventEmitter, save, load, saveDeck, deleteDeck, changeDeckList };