import { BlockProps } from '../../typings/types';
import Block from '../../utils/Block';
import template from './input.hbs';

export default class Input extends Block {
  constructor(props: BlockProps) {
    super('input', props);
  }

  protected init(): void {
    this.element?.classList.add(this.props.className as string);
    this.element?.setAttribute('placeholder', this.props.placeholder as string);
    this.element?.setAttribute('type', this.props.type as string);
    this.element?.setAttribute('name', this.props.name as string);
    if (this.props.value) {
      this.element?.setAttribute('value', this.props.value as string);
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
