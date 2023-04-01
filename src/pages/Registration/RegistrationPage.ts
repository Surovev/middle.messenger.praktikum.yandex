import Block from '../../utils/Block';
import template from './RegistrationPage.hbs';
import validator from '../../utils/Validate';
import { RegistrationForm } from './RegistrationForm';
import { BlockProps } from '../../typings/types';

export class RegistrationPage extends Block {
  constructor(props: BlockProps) {
    super('main', props);
  }

  protected init(): void {
    this.children.registrationForm = new RegistrationForm({
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          validator.validateSubmit(event);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
