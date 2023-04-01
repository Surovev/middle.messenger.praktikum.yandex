import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import validator from '../../utils/Validate';
import { EditPasswordForm } from './EditPasswordForm';
import template from './EditPasswordPage.hbs';

export class EditPasswordPage extends Block {
  constructor(props: BlockProps) {
    super('main', props);
  }

  protected init(): void {
    this.children.form = new EditPasswordForm({
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
