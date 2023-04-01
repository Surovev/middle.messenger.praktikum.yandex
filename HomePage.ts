import Block from './src/utils/Block';
import { Link } from './src/components/link/link';
import template from './HomePage.hbs';
import { renderDOM } from './src/utils/routerDOM';
import validator from './src/utils/Validate';

export class HomePage extends Block {
  constructor() {
    super('div', {});
  }

  protected init() {
    this.children.link1 = new Link({
      text: '1. Error`s',
      events: {
        click: () => {
          renderDOM('error');
        },
      },
    });

    this.children.link2 = new Link({
      text: '2. Login page',
      events: {
        click: () => {
          renderDOM('login');
        },
      },
    });

    this.children.link3 = new Link({
      text: '3. Registration page',
      events: {
        click: () => {
          renderDOM('registration');
        },
      },
    });

    this.children.link4 = new Link({
      text: '4. Profile page',
      events: {
        click: () => {
          renderDOM('profile');
        },
      },
    });

    this.children.link5 = new Link({
      text: '5. Chats',
      events: {
        click: () => {
          renderDOM('chats');
        },
      },
    });

    this.children.link6 = new Link({
      text: '6. Edit Profile',
      events: {
        click: () => {
          renderDOM('editProfile');
        },
      },
    });

    this.children.link7 = new Link({
      text: '7. Change Password',
      events: {
        click: () => {
          renderDOM('editPassword');
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
