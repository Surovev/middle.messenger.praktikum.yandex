import { HandleNameChangeInterface } from '../../pages/Login/LoginPage';
import Block from '../../utils/Block';
import Input from '../input/input';
import template from './inputBlock.hbs';

interface InputBlockProps {
  title: string;
  placeholder: string;
  type: string;
  name: string;
  errorMessage?: string;
  events?: { focusout: (event: HandleNameChangeInterface) => void;
    focusin: (event: HandleNameChangeInterface) => void; };
}

export class InputBlock extends Block {
  constructor(props: InputBlockProps) {
    super('div', props);
  }

  protected init(): void {
    this.element?.classList.add('input');

    this.children.input = new Input({
      className: 'input__item',
      name: this.props.name,
      placeholder: this.props.placeholder,
      type: this.props.type,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
