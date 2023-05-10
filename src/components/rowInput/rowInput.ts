import Block from '../../utils/Block';
import template from './rowInput.hbs';
import Input from '../input/input';
import { BlockProps } from '../../typings/types';

export class RowInput extends Block {
  constructor(props: BlockProps) {
    super('div', props);
  }

  protected init(): void {
    this.element?.classList.add('profile__info-row');

    this.children.input = new Input({
      className: 'profile__info-input',
      name: this.props.name,
      placeholder: this.props.placeholder,
      type: this.props.type,
      events: this.props.events,
      value: this.props.value,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
