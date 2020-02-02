import {AbstractComponent} from './abstract-component.js';

export class ButtonLoadMore extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button class="load-more" type="button">
              load more
            </button>`;
  }
}
