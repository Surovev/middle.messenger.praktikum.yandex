import { Indexed } from '../../typings/types';
import EventBus from '../EventBus';
import set from '../helpers/set';

export enum StoreEvents {
    EVENT_UPDATE = 'Update',
  }

class Store extends EventBus {
  private _state: Indexed;
  static EVENT_UPDATE = 'Update';
  static STORE_NAME = 'appStore';

  constructor() {
    super();
    const savedState = localStorage.getItem(Store.STORE_NAME);
    try {
      this._state = savedState ? (JSON.parse(savedState) ?? {}) : {};
    } catch (e) {
      console.log(e);
    }
    this.on(
      Store.EVENT_UPDATE,
      () => { localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state)); },
    );
  }

  public getState() {
    return this._state;
  }
  public setState(path: string, value: unknown) {
    set(this._state, path, value);
    this.emit(Store.EVENT_UPDATE);
  }
  public clearState() {
    this._state = {};
    this.emit(Store.EVENT_UPDATE);
  }
}

export default new Store();
