import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import { withChats } from '../../utils/store/connect';
import template from './chatCards.hbs';

class ChatCards extends Block {
  constructor(props: BlockProps) {
    super('div', props);
  }

  protected init(): void {
    this.element?.classList.add('chats-feed__wrapper');
  }

  render() {
    return this.compile(template, this.props);
  }
}
export default withChats(ChatCards);
