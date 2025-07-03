export type Listener = ((..._args: unknown[]) => void) & {
  onCleanup?: (_release: () => void) => void;
};

class Notifier {
  private _listeners: Record<string, Set<Listener>> = {};

  addListener(event: string, listener: Listener): () => void {
    if (typeof event !== "string" || typeof listener !== "function") {
      throw new Error("Event name must be a string, listener must be a function");
    }

    if (!this._listeners[event]) {
      this._listeners[event] = new Set();
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

  removeListener(event: string, listener: Listener): void {
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

  notify(event: string, ...args: unknown[]): void {
    const listeners = this._listeners[event];
    if (listeners) {
      const listenersArray = [...listeners];
      for (const listener of listenersArray) {
        listener(...args);
      }
    }
  }
}

export default Notifier;
