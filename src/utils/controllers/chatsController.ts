import { ChangeUsersInChatData, ChatIdData, CreateChatData } from '../../typings/types';
import chatAPI from '../api/chatsApi';
import getFormData from '../helpers/getFormData';
import parseChats from '../helpers/parseChatsData';
import store from '../store';
import messagesController from './messagesController';

class ChatsController {
  private _api;
  constructor() {
    this._api = chatAPI;
  }

  async createChat(e: Event) {
    console.log(e);
    try {
      const formData = getFormData(e) as CreateChatData;
      console.log(formData);
      await this._api.createChat(formData);
      await this.getChats();
    } catch (e) {
      console.log(e);
    }
  }

  async getChats() {
    try {
      const res = await this._api.getChats();
      const chatsData = JSON.parse(res.response);
      store.setState('chats', parseChats(chatsData));
    } catch (e) {
      console.log(e);
    }
  }
  async addUsersToChat(userId: string) {
    const data: ChangeUsersInChatData = {
      users: [userId],
      chatId: store.getState().currentChat.id,
    };
    try {
      await this._api.addUsersToChat(data);
    } catch (e) {
      console.log(e);
    }
  }
  async removeUsersFromChat(userId: string) {
    const data: ChangeUsersInChatData = {
      users: [userId],
      chatId: store.getState().currentChat.id,
    };
    try {
      await this._api.removeUsersFromChat(data);
      // prevents the errors when user deletes himself from chat
      // eslint-disable-next-line eqeqeq
      if (userId == store.getState().user.id) {
        messagesController.closeSocket();
        await this.getChats();
        store.setState('currentChat', null);
        store.setState('messages', null);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getChatUsers() {
    const chatId: string = store.getState().currentChat.id;
    try {
      const res = await this._api.getChatUsers(chatId);
      const data = JSON.parse(res.response);
      store.setState('userSearchResults', data);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteChat() {
    const data: ChatIdData = {
      chatId: store.getState().currentChat.id,
    };
    console.log(data);
    try {
      messagesController.closeSocket();
      await this._api.deleteChat(data);
      await this.getChats();
      store.setState('currentChat', null);
      store.setState('messages', null);
    } catch (e) {
      console.log(e);
    }
  }

  async openChat(chatId: string, chatTitle: string, chatAvatar: string) {
    const { currentChat } = store.getState();
    if (currentChat && currentChat.id === chatId) return;
    store.setState('messages', null);
    store.setState('currentChat', null);
    const newChat = {
      id: chatId,
      title: chatTitle,
      avatar: chatAvatar,
    };
    store.setState(
      'currentChat',
      newChat,
    );
    try {
      const res = await this._api.getChatToken(chatId);
      const data = JSON.parse(res.response);
      const { token } = data;
      const userId = store.getState().user.id;
      messagesController.openSocketConnection({ userId, chatId, token });
    } catch (e) {
      console.log(e);
    }
  }

  async changeChatAvatar(data: FormData) {
    const chatId = store.getState().currentChat.id;
    data.append('chatId', chatId);
    try {
      const res = await this._api.changeAvatar(data);
      const url = JSON.parse(res.response).avatar;

      const newChat = { ...store.getState().currentChat };
      store.setState('currentChat', null);
      newChat.avatar = url;
      store.setState('currentChat', newChat);
      await this.getChats();
    } catch (e) {
      console.log(e);
    }
  }
}

export default new ChatsController();
