import { nanoid } from 'nanoid';
import { BlockProps } from '../typings/types';
import EventBus from './EventBus';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);
  protected props: BlockProps;
  public children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private _meta: { tagName: string; props: any;};

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = 'div', propsWithChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      props,
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () =>void> };

    Object.keys(events).forEach((eventName: string) => {
      this._element?.addEventListener(eventName, events[eventName] as () =>void);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((item) => {
      if (item === 'blur' || item === 'focus') {
        const input = this.element?.querySelector('input');
        if (input) {
          input.removeEventListener(item, events[item] as (e: Event) => void);
        }
      } else {
        this.element?.removeEventListener(item, events[item] as (e: Event) => void);
      }
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  private _init() {
    this._createResources();

    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {}

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps === newProps) {
      return false;
    }
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.render();

    this._removeEvents();

    this._element!.innerHTML = '';

    this._element!.append(fragment);

    this._addEvents();
  }

  // protected compile(template: (context: any) => string, props?: BlockProps) {
  //   if (typeof (props) === 'undefined') {
  //     props = this.props;
  //   }

  //   Object.entries(this.children).forEach(([key, child]) => {
  //     if (Array.isArray(child)) {
  //           props![key] = `<div data-id="${child[0].id}"></div>`;
  //     } else {
  //           props![key] = `<div data-id="${child.id}"></div>`;
  //     }
  //   });

  //   const fragment = <HTMLTemplateElement> this._createDocumentElement('template');
  //   fragment.innerHTML = Handlebars.compile(template)(props);

  //   Object.values(this.children).forEach((child) => {
  //     if (Array.isArray(child)) {
  //       const fr = <HTMLTemplateElement> this._createDocumentElement('template');
  //       try {
  //         child.forEach((cmp) => {
  //           fr.content.appendChild(cmp.getContent());
  //         });
  //       } catch (e) {
  //         console.log(e);
  //       }

  //       const stub = fragment.content.querySelector(`[data-id="${child[0]._id}"]`);
  //       if (stub) {
  //         stub.replaceWith(fr.content);
  //       }
  //     } else {
  //       const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
  //       if (stub) {
  //         stub.replaceWith(child.getContent() as HTMLElement);
  //       }
  //     }
  //   });
  //   return fragment.content;
  // }

  protected compile(template: (context: any) => string, context?: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = `<div data-id="${component[0].id}"></div>`;
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        const fr = <HTMLTemplateElement> this._createDocumentElement('template');
        try {
          child.forEach((cmp) => {
            fr.content.appendChild(cmp.getContent());
          });
        } catch (e) {
          console.log(e);
        }

        const stub = temp.content.querySelector(`[data-id="${child[0].id}"]`);
        if (stub) {
          stub.replaceWith(fr.content);
        }
      } else {
        const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
        if (stub) {
          stub.replaceWith(child.getContent() as HTMLElement);
        }
      }
    });

    // Object.entries(this.children).forEach(([_, component]) => {
    //   const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

    //   if (!stub) {
    //     return;
    //   }

    //   component.getContent()?.append(...Array.from(stub.childNodes));

    //   stub.replaceWith(component.getContent()!);
    // });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        const oldTarget = { ...target };

        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }
}

export default Block;
