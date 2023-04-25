import AuthAPI from '../api/authApi';
import getFormData from '../helpers/getFormData';
import store from '../store';
import chatsController from './chatsController';
import { SignInData, SignUpData } from '../../typings/types';
import router from '../router/router';

class AuthController {
  private _api;
  constructor() {
    this._api = AuthAPI;
  }

  async signIn(e: Event) {
    const data = getFormData(e) as SignInData;
    try {
      await this._api.signIn(data);
      // get profile and info as soon as the user is signed in;
      await this.getUser();
      await chatsController.getChats();
      router.go('/messenger');
    } catch (e) {
      if (e.status === 401) {
        const errorDiv: HTMLElement = document.querySelector('#error-password')!;
        errorDiv.textContent = 'Неверный логин или пароль';
      }
      // prevents the error when the user info is lost (clear localStorage and page re-load)
      try {
        if (JSON.parse(e.response).reason === 'User already in system') {
          await this.getUser();
          await chatsController.getChats();
          router.go('/messenger');
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  async signUp(e: Event) {
    console.log(e);
    const data = getFormData(e) as SignUpData;
    try {
      await this._api.signUp(data);
      await this.getUser();
      router.go('/messenger');
    } catch (e) {
      if (e.status === 409) {
        try {
          const reason = JSON.parse(e.response).reason.split(' ')[0].toLowerCase();
          const errorDiv = document.querySelector(`div.form-field #error-${reason}`);
          if (!errorDiv) return;
          errorDiv.textContent = `Пользователь с таким ${reason} уже существует`;
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  async logOut() {
    try {
      await this._api.logOut();
      store.clearState();
      router.go('/');
    } catch (e) {
      console.log(e);
    }
  }

  async getUser() {
    try {
      const res = await this._api.getUser();
      const data = JSON.parse(res.response);
      store.setState('user', data);
    } catch (e) {
      console.log(e);
    }
  }
}
export default new AuthController();
