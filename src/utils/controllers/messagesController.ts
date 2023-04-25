import store from '../store';
import parseMessages from '../helpers/parseMessages';
import chatsController from './chatsController';
import WebSocketFactory from '../api/websocket';
import { SocketSendData, WebSocketProps } from '../../typings/types';
import { PING_DELAY } from '../consts/consts';

class MessagesController {
  private _api: WebSocketFactory;
  private _pingIntervalId: number;

  openSocketConnection(data: WebSocketProps) {
    if (this._api) {
      this.closeSocket();
    }
    this._api = new WebSocketFactory(
      data,
      {
        onOpen: this.handleSocketOpen.bind(this),
        onClose: this.handleSocketClose.bind(this),
        onError: this.handleSocketError.bind(this),
        onMessage: this.handleSocketMessage.bind(this),
      },
    );
  }

  private _send(data: SocketSendData) {
    this._api.send(data);
  }

  public sendMessage(content: string) {
    this._send(
      {
        content,
        type: 'message',
      },
    );
  }

  public getOldMessages(offset = 0) {
    this._send(
      {
        content: String(offset),
        type: 'get old',
      },
    );
  }

  private _ping() {
    this._send(
      {
        content: '',
        type: 'ping',
      },
    );
  }

  closeSocket() {
    clearInterval(this._pingIntervalId);
    this._api.close();
    // eslint-disable-next-line no-unused-expressions
    this._api;
  }

  handleSocketOpen() {
    console.log('Соединение установлено');
    this.setPing();
    this.getOldMessages();
  }

  handleSocketClose(e: CloseEvent) {
    if (e.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
      console.log(`Код: ${e.code} | Причина: ${e.reason}`);
    }
  }

  handleSocketMessage(e: MessageEvent) {
    try {
      const data = JSON.parse(e.data);
      if (data.type === 'pong' || data.type === 'user connected') {
        return;
      }
      let messagesState: Array<unknown> = [];
      if (store.getState().messages instanceof Array) {
        messagesState = messagesState.concat(store.getState().messages);
      }

      // needed to define message position
      const userId = store.getState().user.id;

      // processing old messages load
      if (Array.isArray(data)) {
        messagesState = messagesState.concat(parseMessages(data, userId));
        if (data.length === 20) {
          const ids = data.map((item) => item.id);
          const maxId = Math.max(...ids);
          // won't create a loop, it's async
          this.getOldMessages(maxId);
        }
        // processing new message
      } else {
        messagesState.unshift(parseMessages(data, userId));
        // update the last message content in sidebar dialogue
        // can't use the recieved message, since it doesn't contain sender login/name
        // and requesting it by id would mean the same delay and traffic as getting chats
        chatsController.getChats();
      }
      store.setState('messages', messagesState);
    } catch (e) {
      console.log(e);
    }
  }

  handleSocketError(e: ErrorEvent) {
    console.log('Ошибка', e.message);
  }

  setPing() {
    this._pingIntervalId = setInterval(() => {
      this._ping();
    }, PING_DELAY) as unknown as number;
  }
}
export default new MessagesController();
