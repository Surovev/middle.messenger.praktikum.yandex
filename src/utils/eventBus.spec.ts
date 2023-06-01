/* eslint-disable no-undef */
import { expect } from 'chai';
import EventBus from './EventBus';

describe('EventBus', () => {
  const eventBus = new EventBus();
  const name = 'test';
  const func = () => {};

  it('on', () => {
    eventBus.on(name, func);
    const currentFunc = eventBus.listeners[name]![0];
    expect(currentFunc).to.eq(func);
  });

  it('off', () => {
    eventBus.off(name, func);
    expect(eventBus.listeners[name]).to.eql([]);
  });
});
