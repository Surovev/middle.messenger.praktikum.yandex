import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import template from './addChatPopup.hbs';
import Input from '../input/input';
import { Button } from '../button/button';

export class AddChatPopup extends Block {
  constructor(props: BlockProps) {
    super('form', props);
  }

  protected init(): void {
    this.children.inputChat = new Input({
      placeholder: 'Введите название чата',
      className: 'cdd',
      name: 'title',
      type: 'text',
    });

    this.children.submitButton = new Button({
      className: 'btn__filling',
      text: 'save',
      type: 'submit',
      events: {
        submit: (event) => {
          event.preventDefault();
        },
      },
    });

    this.children.closePopupButton = new Button({
      className: 'btn__filling',
      text: 'close',
      type: 'button',
      events: {
        click: () => {
          (this.props.closePopup as ()=>void)();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
