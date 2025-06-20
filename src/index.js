// src/index.js
// tests/index.tests.js

class Notifier {
    constructor() {
        this.listeners = {};
    }
    addListener(event, listener) {
        if (typeof event !== 'string' || typeof listener !== 'function') {
            throw new Error('Event name must be a string, listener must be a function');
        }
        this.listeners[event] = this.listeners[event] || new Set();
        const cleanup = () => this.removeListener(event, listener);
        if (!this.listeners[event].has(listener)) {
            this.listeners[event].add(listener);
            if (typeof listener.onCleanup === 'function') {
                listener.onCleanup(cleanup); // Subscriber-Controlled Pattern
            }
        }
        return cleanup;
    }
    addOnceListener(event, listener) {
        if (typeof event !== 'string' || typeof listener !== 'function') {
            throw new Error('Event name must be a string, listener must be a function');
        }
        const wrapper = (...args) => {
            this.removeListener(event, wrapper);
            listener(...args);
        };
        // Preserve onCleanup from original listener
        if (typeof listener.onCleanup === 'function') {
            wrapper.onCleanup = listener.onCleanup;
        }
        this.addListener(event, wrapper);
    }
    removeListener(event, listener) {
        if (typeof event !== 'string' || typeof listener !== 'function') {
            throw new Error('Event name must be a string, listener must be a function');
        }
        if (this.listeners[event] && this.listeners[event].has(listener)) {
            this.listeners[event].delete(listener);
            if (this.listeners[event].size === 0) {
                delete this.listeners[event];
            }
        }
    }

    notify(event, ...args) {
        if (this.listeners[event]) {
            const listeners = [...this.listeners[event]];
            listeners.forEach(listener => {
                try {
                    listener(...args);
                } catch (error) {
                    console.error(`Error in listener for event ${event}:`, error);
                }
            });
        }
    }

    removeAllListeners(event) {
        if (event) {
            if (this.listeners[event]) {
                delete this.listeners[event];
            }
        } else {
            this.listeners = {};
        }
    }
}

export default Notifier;
