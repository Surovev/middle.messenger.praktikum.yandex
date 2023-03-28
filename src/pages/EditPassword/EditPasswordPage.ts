import { Button } from '../../components/button/button';
import { RowInput } from '../../components/rowInput/rowInput';
import Block from '../../utils/Block';
import validator from '../../utils/Validate';
import { HandleNameChangeInterface } from '../Login/LoginPage';
import template from './EditPasswordPage.hbs';

interface EditPasswordPageProps {
  props: any;
}

export class EditPasswordPage extends Block {
  form: Element | null;
  constructor(props: EditPasswordPageProps) {
    super('main', props);
    const form = this.element!.querySelector('.profile__form');
    this.form = form;
    this.form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      validator.validateSubmit(e);
    });
  }

  protected init(): void {
    this.children.olpPasswordInput = new RowInput({
      placeholder: 'insert your password',
      name: 'old_password',
      title: 'Old Password',
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
    this.children.newPasswordInput = new RowInput({
      placeholder: 'insert new password',
      name: 'password',
      title: 'New Password',
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
    this.children.passwordRepeatedInput = new RowInput({
      placeholder: 'confirm new password',
      name: 'password_repeated',
      title: 'Confirm New Password',
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
