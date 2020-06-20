import {createElement} from '../utils/render.js';

const HIDDEN_CLASS = `visually-hidden`;

class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`It's abstract class, only concrete one`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  removeElement() {
    this._element = null;
  }
}

export default AbstractComponent;
