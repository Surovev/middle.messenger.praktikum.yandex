import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import template from './link.hbs';

export class Link extends Block {
  constructor(props: BlockProps) {
    super('p', props);
  }

  init(): void {
    this.element?.classList.add('demo-routing__link');
    this.element?.setAttribute('href', this.props.href as string);
  }

  render() {
    return this.compile(template, this.props);
  }
}
