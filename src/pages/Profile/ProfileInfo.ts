import { Link } from '../../components/link/link';
import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import authController from '../../utils/controllers/authController';
import router from '../../utils/router/router';
import template from './ProfileInfo.hbs';

export class ProfileInfo extends Block {
  constructor(props: BlockProps) {
    super('div', props);
  }

  protected init(): void {
    this.element?.classList.add('profile__wrap');

    this.children.editProfileLink = new Link({
      className: 'profile__link-edit',
      text: 'Изменить данные',
      events: {
        click: () => {
          router.go('/settings');
        },
      },
    });

    this.children.editPasswordLink = new Link({
      className: 'profile__link-edit',
      text: 'Изменить пароль',
      events: {
        click: () => {
          router.go('/edit-password');
        },
      },
    });

    this.children.logoutLink = new Link({
      className: 'profile__link-exit',
      text: 'Выйти',
      events: {
        click: () => {
          authController.logOut();
          // router.go('/edit-password');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
