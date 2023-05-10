import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import { withUserSearch } from '../../utils/store/connect';
import { Button } from '../button/button';
import template from './addUserPopup.hbs';

class AddUserPopup extends Block {
  className: unknown;
  constructor(props: BlockProps) {
    super('form', props);
  }

  protected init(): void {
    this.element?.classList.add(this.props.className as string);

    this.children.closeButton = new Button({
      text: 'X',
      type: 'button',
      className: 'add-user-form__close-button',
      events: {
        click: () => {
          (this.props.closePopup as () => void)();
        },
      },
    });

    this.children.submitButton = new Button({
      text: 'Search',
      type: 'submit',
      className: 's',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withUserSearch(AddUserPopup as unknown as typeof Block);
