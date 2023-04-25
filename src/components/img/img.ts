import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import template from './img.hbs';

export class Img extends Block {
  constructor(props: BlockProps) {
    super('img', props);
  }

  protected init(): void {
    this.element?.classList.add(this.props.className as string);
    this.element?.setAttribute('alt', this.props.alt as string);
    this.element?.setAttribute('src', this.props.src as string);
  }

  render() {
    return this.compile(template, this.props);
  }
}
