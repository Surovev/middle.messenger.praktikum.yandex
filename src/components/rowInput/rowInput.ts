import Block from '../../utils/Block';
import template from './rowInput.hbs';
import Input from '../input/input';

interface RowInputProps {
  title: string;
  placeholder: string;
  type: string;
  name: string;
  errorMessage?: string;
  events?: any;
}

export class RowInput extends Block {
  props: RowInputProps;

  constructor(props: RowInputProps) {
    super('div', props);
  }

  protected init(): void {
    this.element?.classList.add('profile__info-row');

    this.children.input = new Input({
      className: 'profile__info-input',
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
