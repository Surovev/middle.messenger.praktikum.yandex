import { RowInput } from '../../components/rowInput/rowInput';
import { Button } from '../../components/button/button';
import Block from '../../utils/Block';
import template from './EditProfilePage.hbs';

interface EditProfilePageProps {
  props: any;
}

interface HandleNameChangeInterface {
  target: HTMLInputElement;
}

export class EditProfilePage extends Block {
  form: Element | null;

  constructor(props: EditProfilePageProps | any) {
    super('main', props);
    const form = this.element!.querySelector('.profile__wrap');
    this.form = form;
    this.form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      const data = this.form ? new FormData(this.form) : null;
      const entries = data!.entries();
      const result = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const entry of entries) {
        const key = entry[0];
        const val = entry[1];
        result[key] = val;
      }
      console.log(result);
    });
  }

  protected init(): void {
    this.children.inputEmail = new RowInput({
      placeholder: 'email',
      name: 'email',
      title: 'Email',
      type: 'email',
      errorMessage: '',
      events: {
        blur: (event: HandleNameChangeInterface) => {
          console.log(event.target.validity.valid);
          if (!event.target.validity.valid) {
            this.children.inputEmail?.setProps({ errorMessage: 'error' });
          } else {
            this.children.inputEmail?.setProps({ errorMessage: null });
          }
        },
        focus: (event: HandleNameChangeInterface) => {
          console.log(event.target.validity.valid);
          if (!event.target.validity.valid) {
            this.children.inputEmail?.setProps({ errorMessage: 'error' });
          }
        },
      },
    });

    this.children.inputLogin = new RowInput({
      placeholder: 'some login',
      name: 'login',
      title: 'login',
      type: 'text',
      errorMessage: 'kek',
    });

    this.children.inputFirstName = new RowInput({
      placeholder: 'first name',
      name: 'first_name',
      title: 'First Name',
      type: 'text',
      errorMessage: 'kek',
    });

    this.children.inputLastName = new RowInput({
      placeholder: 'last name',
      name: 'second_name',
      title: 'Last Name',
      type: 'text',
      errorMessage: 'kek',
    });

    this.children.inputNickName = new RowInput({
      placeholder: 'nick name',
      name: 'display_name',
      title: 'Nick Name',
      type: 'text',
      errorMessage: 'kek',
    });

    this.children.inputPhone = new RowInput({
      placeholder: 'phone',
      name: 'phone',
      title: 'Phone',
      type: 'text',
      errorMessage: 'kek',
    });

    this.children.submitButton = new Button({
      className: 'btn__filling',
      text: 'Save',
      type: 'submit',
      events: {
        submit: (event: Event) => {
          event.preventDefault();

          console.log(this.form);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
