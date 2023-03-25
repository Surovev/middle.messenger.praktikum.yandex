import Block from '../../utils/Block';
import template from './link.hbs';

interface LinkProps {
  text: string;
  events: any;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super('p', props);
  }

  protected init(): void {
    this.element?.classList.add('demo-routing__link');
    this.element?.setAttribute('href', this.props.href);
  }

  render() {
    return this.compile(template, this.props);
  }
}
