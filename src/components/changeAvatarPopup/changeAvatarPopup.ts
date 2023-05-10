import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import template from './changeAvatarPopup.hbs';
import Input from '../input/input';
import { Button } from '../button/button';

export class СhangeAvatarPopup extends Block {
  constructor(props: BlockProps) {
    super('form', props);
  }

  protected init(): void {
    this.children.inputAvatar = new Input({
      className: 'cdd',
      name: 'avatar',
      placeholder: 'this.props.placeholder',
      type: 'file',
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
