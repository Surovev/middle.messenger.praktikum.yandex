/* eslint-disable no-new */
/* eslint-disable no-undef */
/* eslint-disable max-classes-per-file */

import { expect } from 'chai';
import sinon from 'sinon';
import Block from './Block';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

const getContentFake = sinon.fake.returns(document.createElement('div'));

const BlockMock = class {
  getContent = getContentFake;
} as unknown as typeof Block;

describe('Block', () => {
  class ComponentMock extends BlockMock {
  }

  it('should fire init event on initialization', () => {
    new ComponentMock('div', {});

    expect(eventBusMock.emit.calledWith('init')).to.eq(false);
  });
});
