"use strict";
var EventNotifier = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    default: () => index_default
  });
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
      const cleanup = () => this.removeListener(event, listener);
      if (!this._listeners[event].has(listener)) {
        this._listeners[event].add(listener);
        if (typeof listener.onCleanup === "function") {
          listener.onCleanup(cleanup);
        }
      }
      return cleanup;
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
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=index.global.js.map