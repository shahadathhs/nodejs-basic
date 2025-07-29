import { EventEmitter } from "events";
// or include ./events.js to use the custom implementation
// import { EventEmitter } from "./events";

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

myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
myE.emit('bar');
