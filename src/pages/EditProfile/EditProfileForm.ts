import { RowInput } from '../../components/rowInput/rowInput';
import { Button } from '../../components/button/button';
import Block from '../../utils/Block';
import template from './EditProfileForm.hbs';
import validator from '../../utils/Validate';
import { BlockProps } from '../../typings/types';

export class EditProfileForm extends Block {
  constructor(props: BlockProps) {
    super('form', props);
    this.element?.classList.add('profile__wrap');
  }

  protected init(): void {
    this.children.inputEmail = new RowInput({
      placeholder: 'email',
      name: 'email',
      title: 'Email',
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

    this.children.inputLogin = new RowInput({
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

    this.children.inputFirstName = new RowInput({
      placeholder: 'first name',
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

    this.children.inputLastName = new RowInput({
      placeholder: 'last name',
      name: 'second_name',
      title: 'Last Name',
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

    this.children.inputNickName = new RowInput({
      placeholder: 'nick name',
      name: 'display_name',
      title: 'Nick Name',
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

    this.children.inputPhone = new RowInput({
      placeholder: 'phone',
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

    this.children.submitButton = new Button({
      className: 'btn__filling',
      text: 'Save',
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
