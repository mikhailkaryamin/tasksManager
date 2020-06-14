import AbstractComponent from './abstract-component.js';

class Board extends AbstractComponent {
  constructor() {
    super();
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="board container">
      </section>`
    );
  }
}

export default Board;
