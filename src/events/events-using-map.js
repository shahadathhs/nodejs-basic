// Custom implementation of the EventEmitter object using Map
// Based on the guide from FreeCodeCamp:
// https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/

export class EventEmitter {
  // Map to hold event names and their listeners
  listeners = new Map();

  // Maximum number of listeners per event before warning
  maxListeners = 10;

  /**
   * Adds a listener to the end of the list for a specific event.
   */
  addListener(eventName, fn) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    const fns = this.listeners.get(eventName);
    if (fns.length >= this.maxListeners) {
      console.warn(
        `Warning: Possible EventEmitter memory leak detected. ` +
        `${fns.length + 1} listeners added to "${eventName}".`
      );
    }

    fns.push(fn);
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
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    const onceWrapper = (...args) => {
      fn(...args);
      this.off(eventName, onceWrapper);
    };

    this.listeners.get(eventName).push(onceWrapper);
    return this;
  }

  /**
   * Removes a specific listener for an event. Alias for removeListener()
   */
  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  /**
   * Removes a specific listener, or all if no function is passed.
   */
  removeListener(eventName, fn) {
    const fns = this.listeners.get(eventName);
    if (!fns) return this;

    if (!fn) {
      // Remove all listeners for the event
      this.listeners.delete(eventName);
      return this;
    }

    const updated = fns.filter((listener) => listener !== fn);
    if (updated.length > 0) {
      this.listeners.set(eventName, updated);
    } else {
      this.listeners.delete(eventName);
    }

    return this;
  }

  /**
   * Emits an event, calling all listeners with given arguments.
   */
  emit(eventName, ...args) {
    const fns = this.listeners.get(eventName);
    if (!fns) return false;

    // Clone the array in case listeners modify it
    [...fns].forEach((fn) => fn(...args));
    return true;
  }

  /**
   * Returns the number of listeners for an event.
   */
  listenerCount(eventName) {
    return this.listeners.get(eventName)?.length ?? 0;
  }

  /**
   * Returns the raw array of listeners for a specific event.
   */
  rawListeners(eventName) {
    return this.listeners.get(eventName) ?? [];
  }

  /**
   * Returns an array of all event names with registered listeners.
   */
  eventNames() {
    return [...this.listeners.keys()];
  }

  /**
   * Adds a listener to the **beginning** of the list for an event.
   */
  prependListener(eventName, fn) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    const fns = this.listeners.get(eventName);
    if (fns.length >= this.maxListeners) {
      console.warn(
        `Warning: Possible EventEmitter memory leak detected. ` +
        `${fns.length + 1} listeners added to "${eventName}".`
      );
    }

    fns.unshift(fn);
    return this;
  }

  /**
   * Adds a one-time listener at the beginning of the listener array.
   */
  prependOnceListener(eventName, fn) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    const onceWrapper = (...args) => {
      fn(...args);
      this.off(eventName, onceWrapper);
    };

    this.listeners.get(eventName).unshift(onceWrapper);
    return this;
  }

  /**
   * Removes all listeners for a specific event, or all events if no eventName is provided.
   */
  removeAllListeners(eventName) {
    if (eventName) {
      this.listeners.delete(eventName);
    } else {
      this.listeners.clear();
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
