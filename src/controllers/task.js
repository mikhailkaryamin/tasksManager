import CardTaskComponent from '../components/card-task.js';
import CardTaskEditComponent from '../components/card-task-edit.js';
import TaskModel from '../models/task.js';
import {
  replaceElement,
  render,
  removeElement,
} from '../utils/render.js';
import {
  EscKeyName,
  ModeController,
  NodePosition,
} from '../const.js';
import {onEscKeyDown} from '../utils/common.js';

const SHAKE_ANIMATION_TIMEOUT = 600;

const parseFormData = (formData) => {
  return new TaskModel({
    "description": formData.description,
    "due_date": formData.dueDate,
    "repeating_days": Object.assign({}, formData.repeatingDays),
    "color": formData.color,
    "is_favorite": false,
    "is_done": false,
  });
};

class TaskController {
  constructor(container, onDataChange, onViewChange, modeController) {
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._modeController = modeController;
    this._container = container;
    this._cardTask = null;
    this._cardTaskEdit = null;
    this._onCloseEdit = this._onCloseEdit.bind(this);
    this._subscribeOnEvents = this._subscribeOnEvents.bind(this);
  }

  render(task) {
    const oldCardTaskComponent = this._cardTask;
    const oldCardTaskEditComponent = this._cardTaskEdit;

    this._cardTask = new CardTaskComponent(task);
    this._cardTaskEdit = new CardTaskEditComponent(task);

    this._subscribeOnEvents(task);

    if (this._modeController === ModeController.NEW_TASK) {
      render(this._container, this._cardTaskEdit, NodePosition.PREPEND);
      document.addEventListener(`keydown`, this._onCloseEdit);
      return;
    }

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

  shake() {
    this._cardTaskEdit.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._cardTask.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._cardTaskEdit.getElement().style.animation = ``;
      this._cardTask.getElement().style.animation = ``;

      this._cardTaskEdit.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });

    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _subscribeOnEvents(task) {
    this._cardTaskEdit.setSubmitHandler((evt) => {
      evt.preventDefault();

      const formData = this._cardTaskEdit.getData();
      const newData = parseFormData(formData);

      this._cardTaskEdit.setData({
        saveButtonText: `Saving...`,
      });

      this._onDataChange(this, task, newData);
      this._replaceEditToTask();
      document.removeEventListener(`keydown`, this._onCloseEdit);
    });

    this._cardTask.setEditButtonHandler(() => {
      this._replaceTaskToEdit();
      document.addEventListener(`keydown`, this._onCloseEdit);
    });

    this._cardTaskEdit.setDeleteButtonHandler(() => {
      this._cardTaskEdit.setData({
        deleteButtonText: `Deleting...`,
      });

      this._onDataChange(this, task, null);
    });

    this._cardTask.setFavoriteButtonHandler(() => {
      const newTask = TaskModel.clone(task);
      newTask.isFavorite = !newTask.isFavorite;

      this._onDataChange(this, task, newTask);
    });

    this._cardTask.setArchiveButtonHandler(() => {
      const newTask = TaskModel.clone(task);
      newTask.isArchive = !newTask.isArchive;

      this._onDataChange(this, task, newTask);
    });
  }

  _onCloseEdit(evt) {
    if (ModeController.DEFAULT) {
      onEscKeyDown(evt, this._replaceEditToTask.bind(this));
    }
    if (ModeController.NEW_TASK) {
      const isEscKey = evt.key === EscKeyName.FULL || evt.key === EscKeyName.CUT;
      if (isEscKey) {
        this.destroy();
      }
    }

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

