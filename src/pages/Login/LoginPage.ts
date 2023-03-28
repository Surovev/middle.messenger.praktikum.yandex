import { Button } from '../../components/button/button';
import { InputBlock } from '../../components/inputBlock/inputBlock';
import { inputNames } from '../../typings/types';
import Block from '../../utils/Block';
import validator from '../../utils/Validate';
import template from './LoginPage.hbs';

interface LoginPageProps {
  props: any;
}

export interface HandleNameChangeInterface {
  target: HTMLInputElement;
}

export class LoginPage extends Block {
  form: Element | null;

  constructor(props: LoginPageProps) {
    super('main', props);
    const form = this.element!.querySelector('.login__form');
    this.form = form;
    this.form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      validator.validateSubmit(e);
    });
  }

  protected init(): void {
    this.children.loginInput = new InputBlock({
      placeholder: 'some login',
      name: 'login',
      title: 'login',
      type: 'text',
      events: {
        focusin: (event: HandleNameChangeInterface) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: HandleNameChangeInterface) => {
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
        focusin: (event: HandleNameChangeInterface) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: HandleNameChangeInterface) => {
          validator.validateField(event.target as HTMLInputElement);
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

          console.log(event);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
