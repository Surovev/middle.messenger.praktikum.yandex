import { InputBlock } from '../../components/inputBlock/inputBlock';
import { Button } from '../../components/button/button';

import Block from '../../utils/Block';
import template from './RegistrationPage.hbs';
import { HandleNameChangeInterface } from '../Login/LoginPage';
import validator from '../../utils/Validate';
import { inputNames } from '../../typings/types';

interface RegistrationPageProps {
  props: any;
}

export class RegistrationPage extends Block {
  form: Element | null;

  constructor(props: RegistrationPageProps) {
    super('main', props);
    const form = this.element!.querySelector('.login__form');
    this.form = form;
    this.form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      validator.validateSubmit(e);
    });
  }

  protected init(): void {
    this.children.emailInput = new InputBlock({
      placeholder: 'email',
      name: 'email',
      title: 'email',
      type: 'email',
      events: {
        focusin: (event: HandleNameChangeInterface) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: HandleNameChangeInterface) => {
          validator.validateField(event.target as HTMLInputElement);
        },
      },
    });

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

    this.children.firstNameInput = new InputBlock({
      placeholder: 'First Name',
      name: 'first_name',
      title: 'First Name',
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

    this.children.lastNameInput = new InputBlock({
      placeholder: 'Last Name',
      name: 'second_name',
      title: 'First Name',
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

    this.children.phoneInput = new InputBlock({
      placeholder: 'phone number',
      name: 'phone',
      title: 'Phone',
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
      placeholder: 'your password',
      name: 'password',
      title: 'Password',
      type: 'password',
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
      text: 'Sing Up',
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
