import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import { ChatsForm } from './ChatsForm';
import template from './ChatsPage.hbs';

export class ChatsPage extends Block {
  constructor(props: BlockProps) {
    super('main', props);
  }

  protected init(): void {
    this.children.form = new ChatsForm({
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          const formProps = Object.fromEntries(formData);
          console.log(formProps);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
