import { ActionMenu } from '../../components/actionMenu/actionMenu';
import { AddChatPopup } from '../../components/addChatPopup/addChatPopup';
import AddUserPopup from '../../components/addUserPopup/addUserPopup';
import { Button } from '../../components/button/button';
import { СhangeAvatarPopup } from '../../components/changeAvatarPopup/changeAvatarPopup';
import ChatCards from '../../components/chatCards/chatCards';
import MessageList from '../../components/messageList/messageList';
import { Link } from '../../components/link/link';
import RemoveUserPopup from '../../components/removeUserPopup/removeUserPopup';
import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import validator from '../../utils/Validate';
import chatsController from '../../utils/controllers/chatsController';
import messagesController from '../../utils/controllers/messagesController';
import userController from '../../utils/controllers/userController';
import router from '../../utils/router/router';
import store from '../../utils/store';
import { withCurrentChat } from '../../utils/store/connect';
import { ChatsForm } from './ChatsForm';
import template from './ChatsPage.hbs';
import { IMG_URL } from '../../utils/consts/consts';

const addUserPopup = new AddUserPopup({
  className: 'add-user-form',
  searchResults: [],
  events: {
    submit: (e) => {
      e.preventDefault();
      userController.searchUser(e);
    },
    click: (e) => {
      const target = e.target as HTMLElement;
      if (target === e.currentTarget) {
        closeMenu(addUserPopup as Block);
        return;
      }
      if (target.className === 'add-user-search-result') {
        const userId = target.dataset.uid;
        if (!userId) {
          return;
        }
        chatsController.addUsersToChat(userId);
        closeMenu(addUserPopup as Block);
      }
    },
  },
});

addUserPopup.hide();

const removeUserPopup = new RemoveUserPopup({
  searchResults: [],
  className: 'add-user-form',
  events: {
    click: (e) => {
      const target = e.target as HTMLElement;
      if (target === e.currentTarget) {
        closeMenu(removeUserPopup as Block);
        return;
      }
      if (target.className === 'add-user-search-result') {
        const userId = target.dataset.uid;
        if (!userId) {
          return;
        }
        chatsController.removeUsersFromChat(userId);
        closeMenu(removeUserPopup as Block);
      }
    },
  },
});

removeUserPopup.hide();

const addChatPopup = new AddChatPopup({
  className: 'popup',
  closePopup: () => { addChatPopup?.hide(); },
  events: {
    submit: (event) => {
      event.preventDefault();
      chatsController.createChat(event);
      addChatPopup?.hide();
    },
  },
});

addChatPopup.hide();

function closeMenu(menu: Block) {
  menu.hide();
  if (store.getState().userSearchResults.length) {
    store.setState('userSearchResults', []);
  }
}

const redirectLink = new Link({
  text: 'Profile =>',
  events: {
    click: () => {
      router.go('/profile');
    },
  },
});

const chatForm = new ChatsForm({
  events: {
    submit: (event: Event) => {
      event.preventDefault();
      const messageField = document.querySelector('#message') as HTMLInputElement;
      if (messageField && validator.isNotEmpty(messageField)) {
        const content:string = messageField.value;
        messagesController.sendMessage(content);
        messageField.value = '';
      }
    },
  },
});

const addChatButton = new Button({
  text: 'add new chat +',
  events: {
    click: () => {
      addChatPopup?.show();
    },
  },
});

const actionMenu = new ActionMenu({
  openAvatarPopup: () => { changeAvatarPopup?.show(); },
  openAddUserPopup: () => { addUserPopup!.show(); },
  openRemoveUserPopup: () => { removeUserPopup!.show(); },
  closeActionMenu: () => { actionMenu?.hide(); },
});

actionMenu.hide();

const changeAvatarPopup = new СhangeAvatarPopup({
  className: 'popup',
  closePopup: () => { changeAvatarPopup?.hide(); },
  events: {
    submit: (event) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);

      if ((Object.fromEntries(formData).avatar as File)!.name) {
        chatsController.changeChatAvatar(formData);
        changeAvatarPopup?.hide();
        actionMenu?.hide();
      }
    },
  },
});

changeAvatarPopup.hide();

const moreButton = new Button({
  className: 'message-list__more',
  text: 'more >',
  events: {
    click: () => {
      actionMenu?.show();
    },
  },
});

const Chats = new ChatCards({
  chats: [],
  events: {
    click: (e) => {
      const target = (e.target as HTMLElement).closest('.chat-card') as HTMLElement;
      const id = target.dataset.chatid as string;
      const title = target.dataset.chattitle as string;
      const avatar = target.dataset.chatavatar as string;
      chatsController.openChat(id, title, avatar);
      chatsController.getChatUsers();
    },
  },
});

const Messages = new MessageList({
  messages: null,
});

export class ChatsPage extends Block {
  chats: any;
  constructor(props: BlockProps) {
    super('main', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const SubscribeChatPage = withCurrentChat(ChatsPage);

export default function createChatsPage() {
  return new SubscribeChatPage({
    avatar: `${IMG_URL}${store.getState().user.avatar}`,
    name: store.getState().user.login,
    messageList: Messages,
    chatCards: Chats,
    redirectLink,
    addChatPopup,
    form: chatForm,
    addChatBtn: addChatButton,
    changeChatAvatar: changeAvatarPopup,
    moreButton,
    addUserPopup,
    removeUserPopup,
    actionMenu,
  });
}
