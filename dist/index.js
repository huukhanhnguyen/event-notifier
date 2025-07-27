// src/index.ts
var Notifier = class {
  constructor() {
    this._listeners = {};
  }
  addListener(event, listener) {
    if (typeof event !== "string" || typeof listener !== "function") {
      throw new Error("Event name must be a string, listener must be a function");
    }
    if (!this._listeners[event]) {
      this._listeners[event] = /* @__PURE__ */ new Set();
    }
    const unsubscribe = () => this.removeListener(event, listener);
    if (!this._listeners[event].has(listener)) {
      this._listeners[event].add(listener);
      if (typeof listener.afterSubscribe === "function") {
        listener.afterSubscribe(unsubscribe);
      }
    }
    return unsubscribe;
  }
  removeListener(event, listener) {
    if (typeof event !== "string" || typeof listener !== "function") {
      throw new Error("Event name must be a string, listener must be a function");
    }
    const listeners = this._listeners[event];
    if (listeners && listeners.has(listener)) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        delete this._listeners[event];
      }
    }
  }
  notify(event, ...args) {
    const listeners = this._listeners[event];
    if (listeners) {
      const listenersArray = [...listeners];
      for (const listener of listenersArray) {
        listener(...args);
      }
    }
  }
};
var index_default = Notifier;
export {
  index_default as default
};
//# sourceMappingURL=index.js.map