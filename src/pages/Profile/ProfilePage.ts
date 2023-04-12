import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import template from './ProfilePage.hbs';

export class ProfilePage extends Block {
  constructor(props: BlockProps) {
    super('main', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
