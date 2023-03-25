import { Button } from '../../components/button/button';
import { InputBlock } from '../../components/inputBlock/inputBlock';
import Block from '../../utils/Block';
import template from './LoginPage.hbs';

interface LoginPageProps {
  props: any;
}

export class LoginPage extends Block {
  constructor(props: LoginPageProps) {
    super('main', props);
  }

  protected init(): void {
    this.children.loginInput = new InputBlock({
      placeholder: 'some login',
      name: 'login',
      title: 'login',
      type: 'text',
      errorMessage: 'keks',
    });

    this.children.passwordInput = new InputBlock({
      placeholder: 'some password',
      name: 'password',
      title: 'password',
      type: 'text',
    });

    this.children.submitButton = new Button({
      className: 'btn__filling',
      text: 'Войти',
      type: 'submit',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
