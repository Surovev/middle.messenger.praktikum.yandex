import { InputBlock } from '../../components/inputBlock/inputBlock.ts';
import Block from '../../utils/Block.ts';
import template from './RegistrationPage.hbs';


export class RegistrationPage extends Block {
  constructor(props) {
    super('main', props);
  }

  protected init(): void {

    this.children.emailInput = new InputBlock({
      placeholder: 'email',
      name: 'email',
      title: 'email',
      type: 'email',
    });

    this.children.loginInput = new InputBlock({
      placeholder: 'some login',
      name: 'login',
      title: 'login',
      type: 'text',
      errorMessage: 'kek'
    });

    this.children.firstNameInput = new InputBlock({
      placeholder: 'First Name',
      name: 'first_name',
      title: 'First Name',
      type: 'text',
    });

    this.children.lastNameInput = new InputBlock({
      placeholder: 'Last Name',
      name: 'second_name',
      title: 'First Name',
      type: 'text',
    });

    this.children.phoneInput = new InputBlock({
      placeholder: 'phone number',
      name: 'phone',
      title: 'Phone',
      type: 'text',
    });
    
    this.children.passwordInput = new InputBlock({
      placeholder: 'your password',
      name: 'password',
      title: 'Password',
      type: 'password',
    });

  }

  render() {
    return this.compile(template, this.props);
  }
}