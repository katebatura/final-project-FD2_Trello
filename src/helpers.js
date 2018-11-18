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
function saveDeck(state) {
    const currentState = load();
    const newState = currentState.map(item => {
        if (state.id === item.id) {
            return {
                id: item.id,
                title: item.title,
                lines: state.items,
            }
        }
        return item;
    })
    const string = JSON.stringify(newState);
    localStorage.setItem('todos', string);
}

function deleteDeck(id) {
    const currentState = load();
    const newState = currentState.filter(item => id !== item.id);
    const string = JSON.stringify(newState);
    localStorage.setItem('todos', string);
}

function changeDeckList(newState) {
    const string = JSON.stringify(newState);
    localStorage.setItem('todos', string);
}

function save(data) {
    const string = JSON.stringify(data);
    localStorage.setItem('todos', string);
}

function load() {
    const string = localStorage.getItem('todos');
    const data = JSON.parse(string);
    return data;
}




export { createElement, EventEmitter, save, load, saveDeck, deleteDeck, changeDeckList };