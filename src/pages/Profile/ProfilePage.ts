import { Button } from '../../components/button/button';
import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import { IMG_URL } from '../../utils/consts/consts';
import router from '../../utils/router/router';
import store from '../../utils/store';
import { ProfileInfo } from './ProfileInfo';
import template from './ProfilePage.hbs';

// eslint-disable-next-line prefer-destructuring
const user = store.getState().user;

export class ProfilePage extends Block {
  constructor(props: BlockProps) {
    super('div', props);
  }
  protected init(): void {
    this.children.redirectLink = new Button({
      className: 'profile__redirect-btn',
      text: '<',
      events: {
        click: () => {
          router.go('/messenger');
        },
      },
    });

    this.children.profileInfo = new ProfileInfo({
      avatar: user.avatar ? `${IMG_URL}${user.avatar}` : 'http://placekitten.com/100/100',
      displayName: user.display_name,
      email: user.email,
      login: user.login,
      firstName: user.first_name,
      lastName: user.second_name,
      phone: user.phone,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default function createProfilePage(): Block {
  return new ProfilePage({
  });
}
