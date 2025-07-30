// import Node.js EventEmitter (uncomment to compare with Node's built-in EventEmitter)
// import { EventEmitter } from 'events';

// Import the custom EventEmitter implementation
// import { EventEmitter } from './events.js';
import { EventEmitter } from './events-using-map.js';

export function runEvents() {
  class Emitter extends EventEmitter {}

  const myE = new Emitter();

  // Scenario 1: Multiple listeners for the same event
  myE.on('foo', () => {
    console.info('[Scenario 1] Listener 1 triggered for "foo"');
  });

  myE.on('foo', () => {
    console.info('[Scenario 1] Listener 2 triggered for "foo"');
  });

  // Scenario 2: Listener with parameters
  myE.on('foo', (x) => {
    console.info('[Scenario 2] Listener with param:');
    console.info(x);
  });

  // Scenario 3: One-time listener using once()
  myE.once('bar', () => {
    console.info('[Scenario 3] One-time "bar" listener triggered');
  });

  console.log('\n--- Emitting "foo" without param ---');
  myE.emit('foo'); // triggers 3 listeners

  console.log('\n--- Emitting "foo" with param ---');
  myE.emit('foo', 'Hello world!'); // still triggers 3 listeners, last one logs param

  console.log('\n--- Emitting "bar" multiple times ---');
  for (let i = 0; i < 3; i++) {
    console.info(`Emitting "bar" attempt #${i + 1}`);
    myE.emit('bar'); // only the first will trigger
  }

  // Scenario 4: Remove specific listener
  const listenerToRemove = () => {
    console.info('[Scenario 4] This should not be called');
  };
  myE.on('baz', listenerToRemove);
  myE.off('baz', listenerToRemove);

  console.log('\n--- Emitting "baz" after removing its listener ---');
  myE.emit('baz'); // nothing should happen

  // Scenario 5: Remove all listeners of an event
  myE.on('multi', () => console.log('[Scenario 5] multi listener 1'));
  myE.on('multi', () => console.log('[Scenario 5] multi listener 2'));
  myE.removeListener('multi'); // remove all listeners

  console.log('\n--- Emitting "multi" after removing all its listeners ---');
  myE.emit('multi'); // no output

  // Scenario 6: Check listener count and rawListeners
  myE.on('check', () => {});
  myE.on('check', () => {});
  console.log('\n--- Listener count for "check":', myE.listenerCount('check')); // 2
  console.log('Raw listeners for "check":', myE.rawListeners('check')); // array of 2 functions

  // Scenario 7: Event with multiple arguments
  myE.on('args', (a, b, c) => {
    console.log('[Scenario 7] Received multiple args:', a, b, c);
  });

  console.log('\n--- Emitting "args" with multiple arguments ---');
  myE.emit('args', 1, 'two', { three: 3 });

  // Scenario 8: Using prependListener
  myE.on('prep', () => console.log('[Scenario 8] prep: last listener'));
  myE.prependListener('prep', () => console.log('[Scenario 8] prep: first listener'));

  console.log('\n--- Emitting "prep" to test prependListener ---');
  myE.emit('prep'); // first listener logs before last listener

  // Scenario 9: Using prependOnceListener
  myE.prependOnceListener('boot', () => console.log('[Scenario 9] prepOnce fired FIRST'));
  myE.on('boot', () => console.log('[Scenario 9] normal boot listener'));

  console.log('\n--- Emitting "boot" twice to test prependOnceListener ---');
  myE.emit('boot'); // both fire, once fires first
  myE.emit('boot'); // only normal one fires

  // Scenario 10: Check eventNames()
  console.log('\n--- Event names currently registered:', myE.eventNames());

  // Scenario 11: Remove all listeners globally
  myE.removeAllListeners();
  console.log('\n--- All listeners removed ---');

  console.log('Should emit nothing now:');
  myE.emit('foo');
  myE.emit('boot');
  myE.emit('args');

  // Scenario 12: Set max listeners and trigger warning
  myE.setMaxListeners(2);
  myE.on('warn', () => {});
  myE.on('warn', () => {});
  myE.on('warn', () => {}); // Should show a warning in console
}
