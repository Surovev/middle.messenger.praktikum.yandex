import Block from '../../utils/Block';
import { Link } from '../../components/link/link';
import template from './ErrorPage.hbs';
import { BlockProps } from '../../typings/types';
import router from '../../utils/router/router';

export class ErrorPage extends Block {
  constructor(props: BlockProps) {
    super('div', props);
  }

  init() {
    this.children.redirectLink = new Link({
      text: 'Назад к чатам',
      events: {
        click: () => {
          router.go('/messenger');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default function createErrorPage(): Block {
  return new ErrorPage({
  });
}
