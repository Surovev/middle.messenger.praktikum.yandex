import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import { withMessages } from '../../utils/store/connect';
import template from './messageList.hbs';

class MessageList extends Block {
  constructor(props: BlockProps) {
    super('div', props);
  }

  protected init(): void {
    this.element?.classList.add('message-list__main');
  }

  render() {
    return this.compile(template, this.props);
  }
}
export default withMessages(MessageList);
