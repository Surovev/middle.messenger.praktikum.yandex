import userAPI from '../api/userApi';
import store from '../store';
import getFormData from '../helpers/getFormData';
import { ChangePasswordData, ProfileInfoData, SearchUserData } from '../../typings/types';

class UserController {
  private _api;
  constructor() {
    this._api = userAPI;
  }

  async updateProfile(e: Event) {
    try {
      const formData = getFormData(e) as ProfileInfoData;
      const res = await this._api.changeProfileInfo(formData);
      const data = JSON.parse(res.response);
      store.setState('user', data);
    } catch (e) {
      console.log(e);
    }
  }

  async changePassword(e: Event) {
    const formData = getFormData(e) as ChangePasswordData;
    try {
      await this._api.changePassword(formData);
      return true;
    } catch (e) {
      return false;
    }
  }
  async changeAvatar(data: FormData) {
    try {
      const res = await this._api.changeProfileAvatar(data);
      const userData = JSON.parse(res.response);
      store.setState('user', userData);
    } catch (e) {
      console.log(e);
    }
  }
  async searchUser(e: Event) {
    const formData = getFormData(e) as SearchUserData;
    try {
      const res = await this._api.searchUserByLogin(formData);
      const data = JSON.parse(res.response);
      store.setState('userSearchResults', data);
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserController();
