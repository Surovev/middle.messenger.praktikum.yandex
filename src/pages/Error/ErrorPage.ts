import Block from '../../utils/Block';
import { Link } from '../../components/link/link';
import template from './ErrorPage.hbs';
import { renderDOM } from '../../utils/routerDOM';

interface ErrorPageProps {
  props: any;
}

export class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super('div', props);
  }

  init() {
    this.children.redirectLink = new Link({
      text: 'Назад к чатам',
      events: {
        click: () => {
          renderDOM('home');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
