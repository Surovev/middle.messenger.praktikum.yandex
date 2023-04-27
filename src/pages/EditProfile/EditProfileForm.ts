import { RowInput } from '../../components/rowInput/rowInput';
import { Button } from '../../components/button/button';
import Block from '../../utils/Block';
import template from './EditProfileForm.hbs';
import validator from '../../utils/Validate';
import { BlockProps } from '../../typings/types';
import { Img } from '../../components/img/img';
import userController from '../../utils/controllers/userController';
import { СhangeAvatarPopup } from '../../components/changeAvatarPopup/changeAvatarPopup';
import store from '../../utils/store';
import { withAvatarAndName } from '../../utils/store/connect';

const { user } = store.getState();

class EditProfileForm extends Block {
  popupClass: string;
  constructor(props: BlockProps) {
    super('form', props);
    this.element?.classList.add('profile__wrap');
    this.props.avatar = user.avatar ? user.avatar : '';
  }

  protected init(): void {
    this.children.editAvatar = new Img({
      className: 'profile__edit-avatar',
      src: 'https://cdn-icons-png.flaticon.com/512/61/61456.png',
      alt: 'редактировать аватар',
      events: {
        click: () => {
          this.children.avatarPopup?.show();
        },
      },
    });

    this.children.inputEmail = new RowInput({
      placeholder: 'email',
      name: 'email',
      title: 'Email',
      type: 'email',
      value: user.email ? user.email : '',
      events: {
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },

      },
    });

    this.children.inputLogin = new RowInput({
      placeholder: 'some login',
      name: 'login',
      title: 'login',
      type: 'text',
      value: user.login ? user.login : '',
      events: {
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },

      },
    });

    this.children.inputFirstName = new RowInput({
      placeholder: 'first name',
      name: 'first_name',
      title: 'First Name',
      type: 'text',
      value: user.first_name ? user.first_name : '',
      events: {
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },

      },
    });

    this.children.inputLastName = new RowInput({
      placeholder: 'last name',
      name: 'second_name',
      title: 'Last Name',
      type: 'text',
      value: user.second_name ? user.second_name : '',
      events: {
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },

      },
    });

    this.children.inputNickName = new RowInput({
      placeholder: 'nick name',
      name: 'display_name',
      title: 'Nick Name',
      type: 'text',
      value: user.display_name ? user.display_name : '',
      events: {
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },

      },
    });

    this.children.inputPhone = new RowInput({
      placeholder: 'phone',
      name: 'phone',
      title: 'Phone',
      type: 'text',
      value: user.phone ? user.phone : '',
      events: {
        focusin: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },
        focusout: (event: Event) => {
          validator.validateField(event.target as HTMLInputElement);
        },

      },
    });

    this.children.submitButton = new Button({
      className: 'btn__filling',
      text: 'Save',
      type: 'submit',
      events: {
        submit: (event: Event) => {
          event.preventDefault();
        },
      },
    });

    this.children.avatarPopup = new СhangeAvatarPopup({
      className: 'popup',
      closePopup: () => { this.children.avatarPopup?.hide(); },
      events: {
        submit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.target as HTMLFormElement);
          if ((Object.fromEntries(formData).avatar as File)!.name) {
            userController.changeAvatar(formData);
            this.props.className = 'popup_is-hidden';
            this.children.avatarPopup?.hide();
          }
        },
      },
    });

    this.children.avatarPopup?.hide();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withAvatarAndName(EditProfileForm);
