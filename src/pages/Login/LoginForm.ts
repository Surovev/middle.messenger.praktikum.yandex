import { Button } from '../../components/button/button';
import { InputBlock } from '../../components/inputBlock/inputBlock';
import { Link } from '../../components/link/link';
import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import validator from '../../utils/Validate';
import router from '../../utils/router/router';
import template from './LoginForm.hbs';

export class LoginForm extends Block {
  constructor(props: BlockProps) {
    super('form', props);
    this.element?.classList.add('form');
    this.element?.classList.add('login__form');
  }

  protected init(): void {
    this.children.loginInput = new InputBlock({
      placeholder: 'some login',
      name: 'login',
      title: 'login',
      type: 'text',
      events: {
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
      },

    });

    this.children.passwordInput = new InputBlock({
      placeholder: 'some password',
      name: 'password',
      title: 'password',
      type: 'text',
      events: {
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },

      },
    });
    this.children.redirectLink = new Link({
      className: 'form__link',
      text: 'Есть аккаунт?',
      events: {
        click: () => {
          router.go('/sing-up');
        },
      },
    });

    this.children.submitButton = new Button({
      className: 'btn__filling',
      text: 'Войти',
      type: 'submit',
      events: {
        submit: (event: Event) => {
          event.preventDefault();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
