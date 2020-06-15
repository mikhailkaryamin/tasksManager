import CardTaskComponent from '../components/card-task.js';
import CardTaskEditComponent from '../components/card-task-edit.js';
import {
  replaceElement,
  render,
} from '../utils/render.js';
import {onEscKeyDown} from '../utils/common.js';

class TaskController {
  constructor(container, onDataChange) {
    this.onDataChange = onDataChange;
    this._container = container;
    this._cardTask = null;
    this._cardTaskEdit = null;
  }

  render(task) {
    this._cardTask = new CardTaskComponent(task);
    this._cardTaskEdit = new CardTaskEditComponent(task);

    const onCloseEdit = (evt) => {
      onEscKeyDown(evt, replaceEditToTask);
    };

    const replaceTaskToEdit = () => {
      replaceElement(this._cardTaskEdit, this._cardTask);
    };

    const replaceEditToTask = () => {
      replaceElement(this._cardTask, this._cardTaskEdit);
    };

    this._cardTaskEdit.setSubmitHandler((evt) => {
      evt.preventDefault();
      replaceEditToTask();
      document.removeEventListener(`keydown`, onCloseEdit);
    });

    this._cardTask.setEditButtonHandler(() => {
      replaceTaskToEdit();
      document.addEventListener(`keydown`, onCloseEdit);
    });

    this._cardTask.setFavoriteButtonHandler(() => {
      task.isFavorite = !task.isFavorite;
      this.onDataChange();
    });

    this._cardTask.setArchiveButtonHandler(() => {
      task.isArchive = !task.isArchive;
      this.onDataChange();
    });

    render(this._container, this._cardTask);
  }
}

export default TaskController;

