import {AbstractComponent} from './abstract-component.js';

export class Board extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="board container"></section>`;
  }
}
