import { ChangeUsersInChatData, ChatIdData } from '../../typings/types';
import { BASE_URL } from '../consts/consts';
import HTTPTransport from '../httpTransport';

class ChatsAPI {
  private _chatsURL: string;
  private _chatsUsersURL: string;
  private _tokenURL: string;
  private _avatarURL: string;

  constructor() {
    this._chatsURL = `${BASE_URL}/chats`;
    this._chatsUsersURL = `${BASE_URL}/chats/users`;
    this._tokenURL = `${BASE_URL}/chats/token`;
    this._avatarURL = `${BASE_URL}/chats/avatar`;
  }

  createChat(data: {title: string}) {
    return new HTTPTransport().post(this._chatsURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  getChats() {
    return new HTTPTransport().get(this._chatsURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  addUsersToChat(data: ChangeUsersInChatData) {
    return new HTTPTransport().put(this._chatsUsersURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  removeUsersFromChat(data: ChangeUsersInChatData) {
    return new HTTPTransport().delete(this._chatsUsersURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  deleteChat(data: ChatIdData) {
    return new HTTPTransport().delete(this._chatsURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  getChatUsers(chatId: string) {
    return new HTTPTransport().get(`${this._chatsURL}/${chatId}/users`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  getChatToken(chatId: string) {
    return new HTTPTransport().post(`${this._tokenURL}/${chatId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  changeAvatar(data: FormData) {
    return new HTTPTransport().put(this._avatarURL, {
      data,
    });
  }
}

export default new ChatsAPI();
