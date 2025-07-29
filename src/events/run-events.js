// import { EventEmitter } from "events";
// or include ./events.js to use the custom implementation
import { EventEmitter } from './events';

export function runEvents() {
  class Emitter extends EventEmitter {}

  const myE = new Emitter();

  myE.on('foo', () => {
    console.info('An event occurred 1.');
  });

  myE.on('foo', () => {
    console.info('An event occurred 2.');
  });

  myE.on('foo', (x) => {
    console.info('An event with a parameter occurred:');
    console.info(x);
  });

  myE.once('bar', () => {
    console.info('An event occurred bar.');
  });

  myE.emit('foo');
  myE.emit('foo', 'some text');

  for (let i = 0; i < 9; i++) {
    myE.emit('bar');
  }
}
