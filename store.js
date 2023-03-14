export const dispatcher = new EventTarget();

export class Store {
    constructor(name) {
      this.name = name;
      this.listeners = [];
    }
  
    emitChange = (newValue) => this.listeners.forEach(listener => listener.render(newValue));
  
    addChangeListener = (...listeners) => this.listeners.push(...listeners);
  
    removeChangeListener = listener => {
      const index = this.listeners.indexOf(listener);
      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    };
  
    get = () => JSON.parse(sessionStorage.getItem(this.name));
  
    set = newValue => {
      sessionStorage.setItem(this.name, JSON.stringify(newValue));
      this.emitChange(newValue);
    };

    on = (event, callback) => {
        dispatcher.addEventListener(event, callback.bind(this));
    }
}