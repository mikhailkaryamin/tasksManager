import {createElement} from '../utils.js';

const createTasksListTemplate = () => {
  return (
    `<div class="board__tasks">
    </div>`
  );
};

class TasksList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTasksListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default TasksList;
