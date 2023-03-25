import { RowInput } from '../../components/rowInput/rowInput';
import { Button } from '../../components/button/button';
import Block from '../../utils/Block';
import template from './EditProfilePage.hbs';

interface EditProfilePageProps {
  props: any;
}

export class EditProfilePage extends Block {
  constructor(props: EditProfilePageProps) {
    super('main', props);
  }

  protected init(): void {
    this.children.inputEmail = new RowInput({
      placeholder: 'email',
      name: 'email',
      title: 'Email',
      type: 'email',
      errorMessage: 'kek',
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
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
