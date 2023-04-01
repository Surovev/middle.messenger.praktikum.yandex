import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import Input from '../input/input';
import template from './inputBlock.hbs';

export class InputBlock extends Block {
  constructor(props: BlockProps) {
    super('div', props);
  }

  protected init(): void {
    this.element?.classList.add('input');

    this.children.input = new Input({
      className: 'input__item',
      name: this.props.name,
      placeholder: this.props.placeholder,
      type: this.props.type,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
