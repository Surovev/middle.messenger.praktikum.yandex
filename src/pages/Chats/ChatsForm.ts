import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import template from './ChatsForm.hbs';

export class ChatsForm extends Block {
  constructor(props: BlockProps) {
    super('form', props);
    this.element?.classList.add('input-area');
  }

  render() {
    return this.compile(template, this.props);
  }
}
