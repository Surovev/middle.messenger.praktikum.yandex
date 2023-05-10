import Block from '../Block';

export default class Route {
  private _pathname: string;
  private _blockConstructor: ()=> Block;
  private _block: Block | null;
  private _rootQuery: string;

  constructor(pathname: string, blockConstructor:()=> Block, rootQuery = '#app') {
    this._pathname = pathname;
    this._blockConstructor = blockConstructor;
    this._block = null;
    this._rootQuery = rootQuery;
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      console.log(this._rootQuery);
      this._block = this._blockConstructor();
      const root = document.querySelector(this._rootQuery);
            root!.appendChild(this._block.getContent() as HTMLElement);
            return;
    }
    this._block.show();
  }
}
