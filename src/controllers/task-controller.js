import CardTaskComponent from '../components/card-task.js';
import CardTaskEditComponent from '../components/card-task-edit.js';
import {
  replaceElement,
  render,
} from '../utils/render.js';
import {onEscKeyDown} from '../utils/common.js';

class TaskController {
  constructor(container) {
    this._container = container;
  }

  render(task) {
    const cardTask = new CardTaskComponent(task);
    const cardTaskEdit = new CardTaskEditComponent(task);

    const onCloseEdit = (evt) => {
      onEscKeyDown(evt, replaceEditToTask);
    };

    const replaceTaskToEdit = () => {
      replaceElement(cardTaskEdit, cardTask);
    };

    const replaceEditToTask = () => {
      replaceElement(cardTask, cardTaskEdit);
    };

    cardTaskEdit.setSubmitHandler((evt) => {
      evt.preventDefault();
      replaceEditToTask();
      document.removeEventListener(`keydown`, onCloseEdit);
    });

    cardTask.setEditButtonHandler(() => {
      replaceTaskToEdit();
      document.addEventListener(`keydown`, onCloseEdit);
    });

    render(this._container, cardTask);
  }
}

export default TaskController;

