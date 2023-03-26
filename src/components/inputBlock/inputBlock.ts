import Block from '../../utils/Block';
import Input from '../input/input';
import template from './inputBlock.hbs';

interface InputBlockProps {
  title: string;
  placeholder: string;
  type: string;
  name: string;
  errorMessage?: string;
  events?: any;
}


export class InputBlock extends Block {
  constructor(props: InputBlockProps) {
    super('div', props);
    console.log(template);
  }

  protected init(): void {
    this.element?.classList.add('input');

    this.children.input = new Input({
      className: 'input__item',
      name: this.props.name,
      placeholder: this.props.placeholder,
      type: this.props.type,
      errorMessage: this.props.errorMessage,
      events: this.props.events,

    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
