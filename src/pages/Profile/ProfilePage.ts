import Block from '../../utils/Block';
import template from './ProfilePage.hbs';

interface ProfilePageProps {
  props: any;
}

export class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {
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
