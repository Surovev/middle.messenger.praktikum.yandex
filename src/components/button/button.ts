import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import template from './button.hbs';

export class Button extends Block {
  text: unknown;
  constructor(props: BlockProps) {
    super('button', props);
  }

  protected init(): void {
    this.text = this.props.text;
    this.element?.classList.add('btn');
    this.element?.classList.add(this.props.className as string);
    this.element?.setAttribute('type', this.props.type as string);
  }

  render() {
    return this.compile(template, this.props);
  }
}
