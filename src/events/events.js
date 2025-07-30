// Custom implementation of the EventEmitter object
// Based on the guide from FreeCodeCamp:
// https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/

export class EventEmitter {
  // Master object to hold event names and their listeners
  listeners = {};

  // Maximum number of listeners per event before warning
  maxListeners = 10;

  /**
   * Adds a listener to the end of the list for a specific event.
   */
  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];

    if (this.listeners[eventName].length >= this.maxListeners) {
      console.warn(
        `Warning: Possible EventEmitter memory leak detected. ` +
        `${this.listeners[eventName].length + 1} listeners added to "${eventName}".`
      );
    }

    this.listeners[eventName].push(fn);
    return this;
  }

  /**
   * Alias for addListener()
   */
  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  /**
   * Adds a one-time listener that is removed after being triggered once.
   */
  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];

    const onceWrapper = (...args) => {
      fn(...args);
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].push(onceWrapper);
    return this;
  }

  /**
   * Removes a specific listener for an event.
   * Alias for removeListener()
   */
  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  /**
   * Removes a specific listener, or all if no function is passed.
   */
  removeListener(eventName, fn) {
    const lis = this.listeners[eventName];
    if (!lis) return this;

    if (!fn) {
      // Remove all listeners for the event
      delete this.listeners[eventName];
      return this;
    }

    for (let i = lis.length - 1; i >= 0; i--) {
      if (lis[i] === fn) {
        lis.splice(i, 1);
        break;
      }
    }

    return this;
  }

  /**
   * Emits an event, calling all listeners with given arguments.
   */
  emit(eventName, ...args) {
    const fns = this.listeners[eventName];
    if (!fns) return false;

    // Call each listener with spread args
    fns.forEach((fn) => {
      fn(...args);
    });

    return true;
  }

  /**
   * Returns the number of listeners for an event.
   */
  listenerCount(eventName) {
    const fns = this.listeners[eventName] || [];
    return fns.length;
  }

  /**
   * Returns the raw array of listeners for a specific event.
   */
  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }

  /**
   * Returns an array of all event names with registered listeners.
   */
  eventNames() {
    return Object.keys(this.listeners);
  }

  /**
   * Adds a listener to the **beginning** of the list for an event.
   */
  prependListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];

    if (this.listeners[eventName].length >= this.maxListeners) {
      console.warn(
        `Warning: Possible EventEmitter memory leak detected. ` +
        `${this.listeners[eventName].length + 1} listeners added to "${eventName}".`
      );
    }

    this.listeners[eventName].unshift(fn);
    return this;
  }

  /**
   * Adds a one-time listener at the beginning of the listener array.
   */
  prependOnceListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];

    const onceWrapper = (...args) => {
      fn(...args);
      this.off(eventName, onceWrapper);
    };

    this.listeners[eventName].unshift(onceWrapper);
    return this;
  }

  /**
   * Removes all listeners for a specific event,
   * or all events if no eventName is provided.
   */
  removeAllListeners(eventName) {
    if (eventName) {
      delete this.listeners[eventName];
    } else {
      this.listeners = {};
    }
    return this;
  }

  /**
   * Sets the maximum number of listeners before a memory leak warning is shown.
   */
  setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0) {
      throw new Error('maxListeners must be a non-negative number');
    }
    this.maxListeners = n;
    return this;
  }
}
