import CardTaskComponent from '../components/card-task.js';
import CardTaskEditComponent from '../components/card-task-edit.js';
import {
  replaceElement,
  render,
  removeElement,
} from '../utils/render.js';
import {onEscKeyDown} from '../utils/common.js';

class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._container = container;
    this._cardTask = null;
    this._cardTaskEdit = null;
    this._onCloseEdit = this._onCloseEdit.bind(this);
  }

  render(task) {
    const oldCardTaskComponent = this._cardTask;
    const oldCardTaskEditComponent = this._cardTaskEdit;

    this._cardTask = new CardTaskComponent(task);
    this._cardTaskEdit = new CardTaskEditComponent(task);

    this._cardTaskEdit.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onCloseEdit);
    });

    this._cardTask.setEditButtonHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onCloseEdit);
    });

    this._cardTask.setFavoriteButtonHandler(() => {
      const newData = Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      });

      this._onDataChange(this, task, newData);
    });

    this._cardTask.setArchiveButtonHandler(() => {
      const newData = Object.assign({}, task, {
        isArchive: !task.isArchive,
      });

      this._onDataChange(this, task, newData);
    });

    if (oldCardTaskComponent && oldCardTaskEditComponent) {
      replaceElement(this._cardTask, oldCardTaskComponent);
      replaceElement(this._cardTaskEdit, oldCardTaskEditComponent);
    } else {
      render(this._container, this._cardTask);
    }

  }

  destroy() {
    removeElement(this._cardTask);
    removeElement(this._cardTaskEdit);
    document.removeEventListener(`keydown`, this._onCloseEdit);
  }

  setDefaultView() {
    const cardTaskEl = this._cardTask.getElement();
    const isCloseTaskEdit = cardTaskEl.parentElement;

    if (isCloseTaskEdit) {
      return;
    }

    replaceElement(this._cardTask, this._cardTaskEdit);
  }

  _onCloseEdit(evt) {
    onEscKeyDown(evt, this._replaceEditToTask.bind(this));
    document.removeEventListener(`keydown`, this._onCloseEdit);
  }

  _replaceTaskToEdit() {
    this._onViewChange();
    replaceElement(this._cardTaskEdit, this._cardTask);
  }

  _replaceEditToTask() {
    replaceElement(this._cardTask, this._cardTaskEdit);
  }
}

export default TaskController;

