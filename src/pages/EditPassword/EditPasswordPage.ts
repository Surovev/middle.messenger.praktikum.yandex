import Block from '../../utils/Block';
import template from './EditPasswordPage.hbs';

interface EditPasswordPageProps {
  props: any;
}

export class EditPasswordPage extends Block {
  constructor(props: EditPasswordPageProps) {
    super('main', props);
  }

  //   protected init(): void {
  //       this.element?.classList.add('demo-routing__link');
  //       this.element?.setAttribute('href', this.props.href)
  //   }

  render() {
    return this.compile(template, this.props);
  }
}
