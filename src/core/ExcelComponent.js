import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscibers = [];

    this.prepare();
  }
  // настр компонет до init
  prepare() {}

  // возвр шаблон компонента
  toHTML() {
    return '';
  }

  // уведомляем слушателей про события event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscibers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // уст компонент и слушателя
  init() {
    this.initDOMListeners();
  }

  // удаляем компонет и слушателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscibers.forEach((unsub) => unsub());
  }
}
