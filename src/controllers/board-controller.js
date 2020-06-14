import BoardComponent from '../components/board.js';
import CardTaskComponent from '../components/card-task.js';
import CardTaskEditComponent from '../components/card-task-edit.js';
import LoadMoreButtonComponent from '../components/load-more-button.js';
import SortComponent from '../components/sort.js';
import TasksListComponent from '../components/tasks-list.js';
import NoTasks from '../components/no-tasks.js';

import {generateTasks} from '../mock/task.js';
import {
  render,
  replaceElement,
  removeElement,
} from '../utils/render.js';
import {onEscKeyDown} from '../utils/common.js';
import {
  Sing,
  SHOWING_TASKS_COUNT,
  TASK_COUNT,
} from '../const.js';

class BoardController {
  constructor(container) {
    this._container = container;
    this._tasks = generateTasks(TASK_COUNT);
    this._boardComponent = new BoardComponent();
    this._boardEl = this._boardComponent.getElement();
    this._sortComponent = new SortComponent();
    this._noTasksComponent = new NoTasks();
    this._tasksListComponent = new TasksListComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._startTaskRender = 1;
    this._endTaskRender = this._startTaskRender + SHOWING_TASKS_COUNT;
  }

  _renderTask(tasksListEl, task) {
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

    render(tasksListEl, cardTask);
  }

  _renderTasksList() {
    const tasksForRender = this._tasks.slice(this._startTaskRender, this._endTaskRender);
    const tasksListEl = this._tasksListComponent.getElement();

    tasksForRender.forEach((task) => this._renderTask(tasksListEl, task));

    if (this._showingTasksCount !== 1 && this._tasks.length < this._endTaskRender) {
      this._controlLoadMoreButton(Sing.REMOVE);
    }

    this._startTaskRender += SHOWING_TASKS_COUNT;
    this._endTaskRender += SHOWING_TASKS_COUNT;
  }

  _controlLoadMoreButton(sing) {

    if (sing === Sing.RENDER) {
      render(this._boardEl, this._loadMoreButtonComponent);
      this._loadMoreButtonComponent.setLoadMoreButtonHandler(this._renderTasksList.bind(this));
    }

    if (sing === Sing.REMOVE) {
      removeElement(this._loadMoreButtonComponent);
    }
  }

  _renderBoard() {


    render(this._container, this._boardComponent);

    if (this._tasks.length === 0) {
      render(this._boardEl, this._noTasksComponent.getElement());
      return;
    }

    render(this._boardEl, this._sortComponent);
    render(this._boardEl, this._tasksListComponent);

    this._renderTasksList();

    if (this._tasks.length > this._endTaskRender) {
      this._controlLoadMoreButton(Sing.RENDER);
    }
  }

  render() {
    return this._renderBoard();
  }
}

export default BoardController;
