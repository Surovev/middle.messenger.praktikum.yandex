import Block from '../../utils/Block';
import { Link } from '../../components/link/link';
import template from './ErrorPage.hbs';
import { renderDOM } from '../../utils/routerDOM';
import { BlockProps } from '../../typings/types';

export class ErrorPage extends Block {
  constructor(props: BlockProps) {
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
