import Block from '../../utils/Block';
import template from './EditProfilePage.hbs';
import validator from '../../utils/Validate';
import { EditProfileForm } from './EditProfileForm';
import userController from '../../utils/controllers/userController';
import store from '../../utils/store';
import { BlockProps } from '../../typings/types';
import { IMG_URL } from '../../utils/consts/consts';

// eslint-disable-next-line prefer-destructuring
const user = store.getState().user;

export class EditProfilePage extends Block {
  form: Element | null;

  constructor(props: BlockProps) {
    super('main', props);
  }

  protected init(): void {
    this.children.form = new EditProfileForm({
      avatar: `${IMG_URL}${user.avatar}`,
      name: user.display_name,
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          if (validator.validateSubmit(event)) {
            userController.updateProfile(event);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default function createEditProfilePage(): Block {
  return new EditProfilePage({
  });
}
