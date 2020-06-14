import AbstractComponent from './abstract-component.js';

const createTasksListTemplate = () => {
  return (
    `<div class="board__tasks">
    </div>`
  );
};

class TasksList extends AbstractComponent {
  getTemplate() {
    return createTasksListTemplate();
  }
}

export default TasksList;
