import Block from '../../utils/Block';
import template from './ChatsPage.hbs';

interface ChatsPageProps {
props: any;
}

export class ChatsPage extends Block {
  form: Element | null;

  constructor(props: ChatsPageProps) {
    super('main', props);
    const form = this.element!.querySelector('.input-area');
    const messageInput = form?.querySelector('#message');

    form!.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      console.log({ message: (messageInput as HTMLTextAreaElement).value });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
