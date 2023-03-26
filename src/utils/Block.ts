// import { nanoid } from 'nanoid';
// import EventBus from './EventBus';

// abstract class Block {
//   private EVENTS: Record<string, string> = {
//     INIT: 'init',
//     FLOW_CDM: 'flow:component-did-mount',
//     FLOW_CDU: 'flow:component-did-update',
//     FLOW_RENDER: 'flow:render',
//   };

//   private element: HTMLElement | undefined;
//   private readonly tagName: string;

//   protected eventBus: EventBus;
//   protected props: Record<string, any>;
//   protected children: Record<string, Block>;
//   protected id: string;

//   protected constructor(
//     tagName: string = 'div',
//     propsAndChildren: Record<string, any> = {},
//   ) {
//     this.tagName = tagName;
//     this.id = nanoid();

//     const { children, props } = this.getChildren(propsAndChildren);
//     this.children = children;
//     this.props = this.makePropsProxy({ ...props, id: this.id });

//     this.eventBus = new EventBus();
//     this.registerEvent();
//     this.eventBus.emit(this.EVENTS.INIT!);
//   }

//   private registerEvent(): void {
//     this.eventBus.on(this.EVENTS.INIT!, this.init.bind(this));
//     this.eventBus.on(this.EVENTS.FLOW_CDM!, this.mountComponent.bind(this));
//     this.eventBus.on(this.EVENTS.FLOW_CDU!, this.updateComponent.bind(this));
//     this.eventBus.on(this.EVENTS.FLOW_RENDER!, this.renderComponent.bind(this));
//   }

//   init(): void {
//     this.createResources();
//     this.eventBus.emit(this.EVENTS.FLOW_RENDER!);
//   }

//   private createResources(): void {
//     this.element = this.createDocumentElement(this.tagName);
//   }

//   private createDocumentElement(tagName: string): HTMLElement {
//     return document.createElement(tagName);
//   }

//   private mountComponent(): void {
//     Object.values(this.children).forEach((child) => {
//       child.dispatchMountComponent();
//     });
//   }

//   public dispatchMountComponent(): void {
//     this.eventBus.emit(this.EVENTS.FLOW_CDM!);
//   }

//   private updateComponent(
//     oldProps: Record<string, any>,
//     newProps: Record<string, any>,
//   ): void {
//     const isComponentShouldUpdate = oldProps !== newProps;

//     if (isComponentShouldUpdate) {
//       this.removeEvents();
//       this.eventBus.emit(this.EVENTS.FLOW_RENDER!);
//     }
//   }

//   private renderComponent(): void {
//     const fragment = this.render();
//     const element = fragment.firstElementChild as HTMLElement;

//     if (this.element) {
//       this.element.replaceWith(element);
//       this.element = element;
//     }

//     this.addEvents();
//   }

//   private addEvents(): void {
//     const { events } = this.props;

//     if (events) {
//       Object.keys(events).forEach((eventName) => {
//         if (this.element) {
//           this.element.addEventListener(eventName, events[eventName]);
//         }
//       });
//     }
//   }

//   private removeEvents(): void {
//     const { events } = this.props;

//     if (events) {
//       Object.keys(events).forEach((eventName) => {
//         if (this.element) {
//           this.element.addEventListener(eventName, events[eventName]);
//         }
//       });
//     }
//   }

//   public abstract render(): DocumentFragment;

//   public setProps(newProps: Record<string, any>): void {
//     if (!newProps) {
//       return;
//     }

//     Object.assign(this.props, newProps);
//   }

//   public getElement(): HTMLElement {
//     return <HTMLElement> this.element;
//   }

//   private makePropsProxy(props: Record<string, any>): Record<string, any> {
//     const proxySetting = {
//       get: (target: Record<string, any>, prop: string): unknown => target[prop],

//       set: (
//         target: Record<string, any>,
//         prop: string,
//         value: unknown,
//       ): boolean => {
//         const oldProps = target[prop];
//         target[prop] = value;

//         this.eventBus.emit(this.EVENTS.FLOW_CDU!, oldProps, target[prop]);
//         return true;
//       },

//       deleteProperty: (target: Record<string, any>, prop: string): boolean => {
//         const oldProps = target[prop];
//         delete target[prop];

//         this.eventBus.emit(this.EVENTS.FLOW_CDU!, oldProps, target[prop]);
//         return true;
//       },
//     };

//     return new Proxy(props, proxySetting);
//   }

//   private getChildren(propsAndChildren: Record<string, any>) {
//     const children: Record<string, Block> | any = {};
//     const props: Record<string, any> = {};

//     Object.entries(propsAndChildren).forEach(([key, value]) => {
//       if (value instanceof Block) {
//         (children[key] = value);
//       } else { (props[key] = value); }
//     });

//     return { children, props };
//   }

//   protected setTemplate(template: Function, props: Record<string, any>) {
//     const propsAndStubs = { ...props };

//     Object.entries(this.children).forEach(([key, child]) => {
//       propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
//     });

//     const fragment = this.createDocumentElement(
//       'template',
//     ) as HTMLTemplateElement;
//     fragment.innerHTML = template(propsAndStubs);

//     Object.values(this.children).forEach((child) => {
//       const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
//       (stub as HTMLElement).replaceWith(child.getElement());
//     });

//     return fragment.content;
//   }
// }

// export default Block;
import { nanoid } from 'nanoid';
import EventBus from './EventBus';

// Нельзя создавать экземпляр данного класса
class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(6);
  protected props: any;
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

  // private addEvents(): void {
  //     const { events } = this.props;

  //     if (events) {
  //       Object.keys(events).forEach((eventName) => {
  //         if (this.element) {
  //           this.element.addEventListener(eventName, events[eventName]);
  //         }
  //       });
  //     }
  //   }

  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () =>void> };

    Object.keys(events).forEach((eventName: string) => {
      this._element?.addEventListener(eventName, events[eventName] as () =>void);
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

    this._element!.innerHTML = '';

    this._element!.append(fragment);

    this._addEvents();
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    });

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
