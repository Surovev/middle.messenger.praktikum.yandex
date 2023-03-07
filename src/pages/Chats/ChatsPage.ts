
import Block from '../../utils/Block';
import template from './ChatsPage.hbs';


export class ChatsPage extends Block {
  constructor(props) {
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