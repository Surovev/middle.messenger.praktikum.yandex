import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import validator from '../../utils/Validate';
import userController from '../../utils/controllers/userController';
import store from '../../utils/store';
import { EditPasswordForm } from './EditPasswordForm';
import template from './EditPasswordPage.hbs';

// eslint-disable-next-line prefer-destructuring
const user = store.getState().user;

export class EditPasswordPage extends Block {
  constructor(props: BlockProps) {
    super('main', props);
  }

  protected init(): void {
    this.children.form = new EditPasswordForm({
      avatar: user.avatar ? user.avatar : 'http://placekitten.com/100/100',
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          if (validator.validateSubmit(event)) {
            userController.changePassword(event);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default function createEditPasswordPage(): Block {
  return new EditPasswordPage({
  });
}
