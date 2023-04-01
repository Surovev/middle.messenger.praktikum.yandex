import { Button } from '../../components/button/button';
import { RowInput } from '../../components/rowInput/rowInput';
import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import validator from '../../utils/Validate';
import template from './EditPasswordForm.hbs';

export class EditPasswordForm extends Block {
  constructor(props: BlockProps) {
    super('form', props);
    this.element?.classList.add('profile__wrap');
    this.element?.classList.add('profile__form');
  }

  protected init(): void {
    this.children.olpPasswordInput = new RowInput({
      placeholder: 'insert your password',
      name: 'old_password',
      title: 'Old Password',
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
    this.children.newPasswordInput = new RowInput({
      placeholder: 'insert new password',
      name: 'password',
      title: 'New Password',
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
    this.children.passwordRepeatedInput = new RowInput({
      placeholder: 'confirm new password',
      name: 'password_repeated',
      title: 'Confirm New Password',
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
