import Block from '../../utils/Block';
import template from './EditProfilePage.hbs';
import validator from '../../utils/Validate';
import EditProfileForm from './EditProfileForm';
import userController from '../../utils/controllers/userController';
import { BlockProps } from '../../typings/types';
import { Button } from '../../components/button/button';
import router from '../../utils/router/router';

const Form = new EditProfileForm({
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      if (validator.validateSubmit(event)) {
        userController.updateProfile(event);
      }
    },
  },
});

const RedirectLink = new Button({
  className: 'profile__redirect-btn',
  text: '<',
  events: {
    click: () => {
      router.go('/profile');
    },
  },
});

export class EditProfilePage extends Block {
  constructor(props: BlockProps) {
    super('div', props);
  }

  protected init(): void {
  }

  render() {
    return this.compile(template, this.props);
  }
}

const SubscribeEditProfilePage = EditProfilePage;

export default function createEditProfilePage(): Block {
  return new SubscribeEditProfilePage({
    form: Form,
    redirectLink: RedirectLink,
  });
}
