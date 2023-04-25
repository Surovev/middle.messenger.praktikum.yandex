import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import template from './link.hbs';

export class Link extends Block {
  text: string;
  constructor(props: BlockProps) {
    super('a', props);
  }

  init(): void {
    this.element?.classList.add(this.props.className as string);
    this.text = this.props.text as string;
  }

  render() {
    return this.compile(template, this.props);
  }
}
