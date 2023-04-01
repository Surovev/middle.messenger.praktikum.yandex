import { InputBlock } from '../../components/inputBlock/inputBlock';
import { Button } from '../../components/button/button';
import Block from '../../utils/Block';
import template from './RegistrationForm.hbs';
import validator from '../../utils/Validate';
import { BlockProps } from '../../typings/types';

export class RegistrationForm extends Block {
  constructor(props: BlockProps) {
    super('form', props);
    this.element?.classList.add('form');
    this.element?.classList.add('login__form');
  }

  protected init(): void {
    this.children.emailInput = new InputBlock({
      placeholder: 'email',
      name: 'email',
      title: 'email',
      type: 'email',
      events: {
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
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
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
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
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
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
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
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
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
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
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
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
