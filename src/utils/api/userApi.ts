import { ChangePasswordData, ProfileInfoData, SearchUserData } from '../../typings/types';
import { BASE_URL } from '../consts/consts';
import HTTPTransport from '../httpTransport';

class UserAPI {
  private _passwordURL: string;
  private _profileURL: string;
  private _profileAvatarURL: string;
  private _searchURL: string;

  constructor() {
    this._passwordURL = `${BASE_URL}/user/password`;
    this._profileURL = `${BASE_URL}/user/profile`;
    this._profileAvatarURL = `${BASE_URL}/user/profile/avatar`;
    this._searchURL = `${BASE_URL}/user/search`;
  }

  changeProfileInfo(data: ProfileInfoData) {
    return new HTTPTransport().put(this._profileURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  changePassword(data: ChangePasswordData) {
    return new HTTPTransport().put(this._passwordURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  changeProfileAvatar(data: FormData) {
    return new HTTPTransport().put(this._profileAvatarURL, {
      data,
    });
  }

  searchUserByLogin(data: SearchUserData) {
    return new HTTPTransport().post(this._searchURL, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data,
    });
  }
}

export default new UserAPI();
