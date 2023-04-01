import Block from '../../utils/Block';
import template from './EditProfilePage.hbs';
import validator from '../../utils/Validate';
import { EditProfileForm } from './EditProfileForm';

interface EditProfilePageProps {
  props: any;
}

export class EditProfilePage extends Block {
  form: Element | null;

  constructor(props: EditProfilePageProps | any) {
    super('main', props);
    // const form = this.element!.querySelector('.profile__wrap');
    // this.form = form;
    // this.form?.addEventListener('submit', (e: Event) => {
    //   e.preventDefault();
    //   validator.validateSubmit(e);
    // });
  }

  protected init(): void {
    this.children.form = new EditProfileForm({
      events: {
        submit: (event: Event) => {
          event.preventDefault();
          validator.validateSubmit(event);
        },
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
