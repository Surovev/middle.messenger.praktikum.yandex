import { inputNames } from '../typings/types';

class FormValidator {
  private _form: HTMLFormElement;
  private _validationRegex: inputNames = {
    first_name: /^[A-ZА-Я][a-zа-я-]+$/,
    second_name: /^[A-ZА-Я][a-zа-я]+$/,
    password: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
    newPassword: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    login: /^(?![0-9]+$)[A-Za-z0-9-_]{3,20}$/,
    phone: /^\+?\d{10,15}$/,
  };
  private _invalidInputMessages = {
    first_name: 'Без пробелов, цифр и спецсимволов(кроме дефиса), первая буква должна быть заглавной',
    second_name: 'Без пробелов, цифр и спецсимволов(кроме дефиса), первая буква должна быть заглавной',
    password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
    newPassword: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
    password_repeated: 'Пароли не совпадают',
    phone: 'Некорректный номер телефона',
    email: 'Некорректный email',
    login: 'От 3 до 20 символов, латиница, без пробелов, допустимы дефис и нижнее подчёркивание.',
    empty: 'Пожалуйста, заполните поле',
  };

  public validateField(field: HTMLInputElement): boolean {
    const key:string = field.name;
    if (!this.isNotEmpty(field)) {
      this._setErrorMessage(field, this._invalidInputMessages.empty);
      return false;
    }
    let valid: boolean;
    if (key === 'password_repeated') {
      const firstPassword = field.form!.elements.namedItem('newPassword') as HTMLInputElement;
      valid = firstPassword.value === field.value;
    } else {
      const regex = this._validationRegex[key as keyof inputNames] || this._validationRegex.password;
      valid = regex as RegExp ? (regex as RegExp).test(field.value) : false;
    }

    if (valid) {
      this._setErrorMessage(field, '');
      return true;
    }
    this._setErrorMessage(field, this._invalidInputMessages[key as keyof inputNames] || this._invalidInputMessages.password);
    return false;
  }

  public isNotEmpty(field: HTMLTextAreaElement | HTMLInputElement): boolean {
    return field.value !== '';
  }

  private _setErrorMessage(field: HTMLInputElement, mes: string) {
    const errorDiv: HTMLElement = document.querySelector(`#error-${field.name}`)!;
    errorDiv.innerText = mes;
  }

  public validateSubmit(event: Event): boolean {
    event.preventDefault();
    const result: inputNames = {};
    this._form = event.target as HTMLFormElement;
    const fields = Array.from(this._form.elements).filter((element) => element.tagName === 'INPUT') as HTMLInputElement[];
    let allValid = true;

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        allValid = false;
      }
    });

    if (allValid) {
      fields.forEach((field) => {
        if (field.name !== 'password_repeated') {
          result[field.name as keyof inputNames] = field.value;
        }
      });
      console.log(result);
      return true;
    }
    return false;
  }
}

const validator = new FormValidator();
export default validator;
