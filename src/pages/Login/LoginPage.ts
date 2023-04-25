import Block from '../../utils/Block';
import template from './LoginPage.hbs';
import validator from '../../utils/Validate';
import { LoginForm } from './LoginForm';
import { BlockProps } from '../../typings/types';
import authController from '../../utils/controllers/authController';

export class LoginPage extends Block {
  constructor(props: BlockProps) {
    super('main', props);
  }

  protected init(): void {
    this.children.loginForm = new LoginForm({
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          if (validator.validateSubmit(event)) {
            authController.signIn(event);
          }
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default function createLoginPage(): Block {
  return new LoginPage({
  });
}
