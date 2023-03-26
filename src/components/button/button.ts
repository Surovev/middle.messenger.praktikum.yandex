import Block from '../../utils/Block';
import template from './button.hbs';

interface buttonProps {
  className: string;
  type: string;
  text: string;
  events: any;
}

export class Button extends Block {
  text: string;
  constructor(props: buttonProps) {
    super('button', props);
  }

  protected init(): void {
    this.text = this.props.text;
    this.element?.classList.add('btn');
    this.element?.classList.add(this.props.className);
    this.element?.setAttribute('type', this.props.type);
  }

  render() {
    return this.compile(template, this.props);
  }
}
