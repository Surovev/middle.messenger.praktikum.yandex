
import Block from '../../utils/Block.ts';
import template from './input.hbs';

interface InputProps {
  className: string;
  placeholder: string;
  type: string;
  name: string;
  errorMessage?: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super('input', props);
    console.log(template);
  }

  protected init(): void {
      this.element?.classList.add(this.props.className);
      this.element?.setAttribute("placeholder", this.props.placeholder);
      this.element?.setAttribute("type", this.props.type);
      this.element?.setAttribute("name", this.props.name);


  }

  render() {
    return this.compile(template, this.props);
  }
}