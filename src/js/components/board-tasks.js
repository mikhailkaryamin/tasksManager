import {AbstractComponent} from './abstract-component.js';

export class TasksList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}


