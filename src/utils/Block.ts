// import { nanoid } from 'nanoid';
// import { BlockProps } from '../typings/types';
// import EventBus from './EventBus';

// class Block {
//   static EVENTS = {
//     INIT: 'init',
//     FLOW_CDM: 'flow:component-did-mount',
//     FLOW_CDU: 'flow:component-did-update',
//     FLOW_RENDER: 'flow:render',
//   };

//   public id = nanoid(6);
//   protected props: BlockProps;
//   public children: Record<string, Block>;
//   private eventBus: () => EventBus;
//   private _element: HTMLElement | null = null;
//   private _meta: { tagName: string; props: any;};

//   /** JSDoc
//    * @param {string} tagName
//    * @param {Object} props
//    *
//    * @returns {void}
//    */
//   constructor(tagName = 'div', propsWithChildren: any = {}) {
//     const eventBus = new EventBus();

//     const { props, children } = this._getChildrenAndProps(propsWithChildren);

//     this._meta = {
//       tagName,
//       props,
//     };

//     this.children = children;
//     this.props = this._makePropsProxy(props);

//     this.eventBus = () => eventBus;

//     this._registerEvents(eventBus);

//     eventBus.emit(Block.EVENTS.INIT);
//   }

//   _getChildrenAndProps(childrenAndProps: any) {
//     const props: Record<string, any> = {};
//     const children: Record<string, Block> = {};

//     Object.entries(childrenAndProps).forEach(([key, value]) => {
//       if (value instanceof Block) {
//         children[key] = value;
//       } else {
//         props[key] = value;
//       }
//     });

//     return { props, children };
//   }

//   _addEvents() {
//     const { events = {} } = this.props as { events: Record<string, () =>void> };

//     Object.keys(events).forEach((eventName: string) => {
//       this._element?.addEventListener(eventName, events[eventName] as () =>void);
//     });
//   }

//   _removeEvents() {
//     const { events = {} } = this.props;
//     Object.keys(events).forEach((item) => {
//       if (item === 'blur' || item === 'focus') {
//         const input = this.element?.querySelector('input');
//         if (input) {
//           input.removeEventListener(item, events[item] as (e: Event) => void);
//         }
//       } else {
//         this.element?.removeEventListener(item, events[item] as (e: Event) => void);
//       }
//     });
//   }

//   _registerEvents(eventBus: EventBus) {
//     eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
//     eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
//   }

//   _createResources() {
//     const { tagName } = this._meta;
//     this._element = this._createDocumentElement(tagName);
//   }

//   private _init() {
//     this._createResources();

//     this.init();

//     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//   }

//   protected init() {}

//   _componentDidMount() {
//     this.componentDidMount();
//   }

//   componentDidMount() {}

//   public dispatchComponentDidMount() {
//     this.eventBus().emit(Block.EVENTS.FLOW_CDM);

//     Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
//   }

//   private _componentDidUpdate(oldProps: any, newProps: any) {
//     if (this.componentDidUpdate(oldProps, newProps)) {
//       this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
//     }
//   }

//   protected componentDidUpdate(oldProps: any, newProps: any) {
//     if (oldProps === newProps) {
//       return false;
//     }
//     return true;
//   }

//   setProps = (nextProps: any) => {
//     if (!nextProps) {
//       return;
//     }

//     Object.assign(this.props, nextProps);
//   };

//   get element() {
//     return this._element;
//   }

//   private _render() {
//     const fragment = this.render();

//     this._removeEvents();

//     this._element!.innerHTML = '';

//     this._element!.append(fragment);

//     this._addEvents();
//   }

//   protected compile(template: (context: any) => string, context?: any) {
//     const contextAndStubs = { ...context };

//     Object.entries(this.children).forEach(([name, component]) => {
//       if (Array.isArray(component)) {
//         contextAndStubs[name] = `<div data-id="${component[0].id}"></div>`;
//       } else {
//         contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
//       }
//     });

//     const html = template(contextAndStubs);

//     const temp = document.createElement('template');

//     temp.innerHTML = html;
//     Object.values(this.children).forEach((child) => {
//       if (Array.isArray(child)) {
//         const fr = <HTMLTemplateElement> this._createDocumentElement('template');
//         try {
//           child.forEach((cmp) => {
//             fr.content.appendChild(cmp.getContent());
//           });
//         } catch (e) {
//           console.log(e);
//         }

//         const stub = temp.content.querySelector(`[data-id="${child[0].id}"]`);
//         if (stub) {
//           stub.replaceWith(fr.content);
//         }
//       } else {
//         const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
//         if (stub) {
//           stub.replaceWith(child.getContent() as HTMLElement);
//         }
//       }
//     });

//     return temp.content;
//   }

//   protected render(): DocumentFragment {
//     return new DocumentFragment();
//   }

//   getContent() {
//     return this.element;
//   }

//   _makePropsProxy(props: any) {
//     // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
//     const self = this;

//     return new Proxy(props, {
//       get(target, prop) {
//         const value = target[prop];
//         return typeof value === 'function' ? value.bind(target) : value;
//       },
//       set(target, prop, value) {
//         const oldTarget = { ...target };

//         target[prop] = value;

//         // Запускаем обновление компоненты
//         // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
//         self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
//         return true;
//       },
//       deleteProperty() {
//         throw new Error('Нет доступа');
//       },
//     });
//   }

//   _createDocumentElement(tagName: string) {
//     // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
//     return document.createElement(tagName);
//   }

//   show() {
//     this.getContent()!.style.display = 'block';
//   }

//   hide() {
//     this.getContent()!.style.display = 'none';
//   }
// }

// export default Block;


import EventBus from './EventBus';
import { nanoid } from 'nanoid';

class Block<P extends Record<string, any> = any> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render'
    } as const;

    public id = nanoid(6);

    protected props: P;

    public children: Record<string, Block>;

    public childrenCollection: Record<string, Array<Block>>;

    private eventBus: () => EventBus;

    private _element: HTMLElement | null = null;

    private readonly _meta: { tagName: string; props: P; };

    /** JSDoc
     * @param {string} tagName
     * @param {Object} propsWithChildren
     *
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/default-param-last
    constructor(tagName = 'div', propsWithChildren: P) {
        const eventBus = new EventBus();

        const { props, children } = this._getChildrenAndProps(propsWithChildren);

        this._meta = {
            tagName,
            props: props as P
        };

        this.children = children;
        this.props = this._makePropsProxy(props);
        this.childrenCollection = this._makeChildrenCollectionProxy({});

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block> } {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key as string] = value;
            } else {
                props[key] = value;
            }
        });

        return { props: props as P, children };
    }

    _addEvents() {
        const { events = {} } = this.props as P & { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]!);
        });
    }

    _removeEvents() {
        const { events = {} } = this.props as P & { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.removeEventListener(eventName, events[eventName]!);
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

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    protected componentDidUpdate(oldProps: P, newProps: P) {
        return true;
    }

    setProps = (nextProps: P) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element as HTMLElement;
    }

    private _render() {
        const block = this.render();

        this._removeEvents();
        this._element!.innerHTML = '';

        this._element!.append(block);

        this._addEvents();
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    protected compile(template: any, context: any) {
        const contextAndStubs = { ...context };

        Object.entries(this.children).forEach(([name, component]) => {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
        });

        for (const childrenCollection in this.childrenCollection) {
            for (const newChild of this.childrenCollection[childrenCollection]!) {
                if (!contextAndStubs[childrenCollection]) {
                    contextAndStubs[childrenCollection] = [];
                }

                contextAndStubs[childrenCollection].push(`<div data-id="${newChild.id}"></div>`);
            }
        }

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(this.children).forEach(([_, component]) => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);
        });

        for (const childrenCollection in this.childrenCollection) {
            for (const newChild of this.childrenCollection[childrenCollection]!) {
                const stub = temp.content.querySelector(`[data-id="${newChild.id}"]`);

                if (!stub) {
                    break;
                }

                newChild.getContent()?.append(...Array.from(stub.childNodes));

                stub.replaceWith(newChild.getContent()!);
            }
        }

        return temp.content;
    }

    getContent() {
        return this.element;
    }

    _makeChildrenCollectionProxy(childrenCollection: Record<string, any>) {
        const self = this;

        return new Proxy(childrenCollection, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = { ...target };

                target[prop as string] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget as unknown as string, target as unknown as string);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    _makePropsProxy(props: P) {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = { ...target };

                target[prop as keyof P] = value;

                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget as unknown as string, target as unknown as string);

                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            }
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    public show() {
        this.getContent().style.display = 'block';
    }

    public hide() {
        this.getContent().style.display = 'none';
    }
}

export default Block;
