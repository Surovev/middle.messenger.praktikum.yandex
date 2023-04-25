import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import chatsController from '../../utils/controllers/chatsController';
import { Button } from '../button/button';
import template from './actionMenu.hbs';

export class ActionMenu extends Block {
  constructor(props: BlockProps) {
    super('button', props);
  }

  protected init(): void {
    this.element?.classList.add('action-menu');

    this.children.addUserBtn = new Button({
      text: 'Add user',
      events: {
        click: () => {
          (this.props.openAddUserPopup as ()=>void)();
          (this.props.closeActionMenu as ()=>void)();
        },
      },

    });
    this.children.deleteUserBtn = new Button({
      text: 'Delete user',
      events: {
        click: () => {
          (this.props.openRemoveUserPopup as ()=>void)();
          (this.props.closeActionMenu as ()=>void)();
        },
      },
    });
    this.children.deleteChatBtn = new Button({
      text: 'Delete current chat',
      events: {
        click: () => {
          chatsController.deleteChat();
          (this.props.closeActionMenu as ()=>void)();
        },
      },
    });
    this.children.changeImgBtn = new Button({
      text: 'Change current chat avatar',
      events: {
        click: () => {
          (this.props.openAvatarPopup as ()=>void)();
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
