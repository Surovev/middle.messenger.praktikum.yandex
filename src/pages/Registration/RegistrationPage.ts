import Block from '../../utils/Block';
import template from './RegistrationPage.hbs';
import validator from '../../utils/Validate';
import { RegistrationForm } from './RegistrationForm';
import { BlockProps } from '../../typings/types';
import authController from '../../utils/controllers/authController';

export class RegistrationPage extends Block {
  constructor(props: BlockProps) {
    super('div', props);
  }

  protected init(): void {
    this.children.registrationForm = new RegistrationForm({
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          if (validator.validateSubmit(event)) {
            authController.signUp(event);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default function createRegistrationPage(): Block {
  return new RegistrationPage({
  });
}
