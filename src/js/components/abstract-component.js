import {createElement} from '../utils.js';

export class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantite AbstractComponent, only concerte one.`);
    }
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  removeElement() {
    this._element = null;

    return this._element;
  }
}
