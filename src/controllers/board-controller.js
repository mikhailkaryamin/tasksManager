import BoardComponent from '../components/board.js';
import LoadMoreButtonComponent from '../components/load-more-button.js';
import NoTasks from '../components/no-tasks.js';
import SortComponent from '../components/sort.js';
import TasksListComponent from '../components/tasks-list.js';
import TaskController from './task-controller.js';
import {
  render,
  removeElement,
} from '../utils/render.js';
import {
  SHOWING_TASKS_COUNT,
  SortType,
} from '../const.js';


class BoardController {
  constructor(container) {
    this._container = container;
    this._tasks = [];
    this._sortedTasks = [];
    this._boardComponent = new BoardComponent();
    this._boardEl = this._boardComponent.getElement();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._noTasksComponent = new NoTasks();
    this._sortComponent = new SortComponent();
    this._tasksListComponent = new TasksListComponent();
    this._tasksListEl = this._tasksListComponent.getElement();
    this._startTaskRender = 1;
    this._endTaskRender = this._startTaskRender + SHOWING_TASKS_COUNT;
  }

  render(tasks) {
    this._tasks = tasks.slice();
    this._sortedTasks = tasks.slice();

    render(this._container, this._boardComponent);

    if (this._tasks.length === 0) {
      render(this._boardEl, this._noTasksComponent.getElement());
      return;
    }

    render(this._boardEl, this._sortComponent);
    render(this._boardEl, this._tasksListComponent);

    this._renderTasksList();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      this._getSortedTasks(sortType);
      this._resetBoard();
      this._renderTasksList();
    });
  }

  _controlLoadMoreButton() {
    if (this._tasks.length > this._endTaskRender) {
      render(this._boardEl, this._loadMoreButtonComponent);
      this._loadMoreButtonComponent.setLoadMoreButtonHandler(this._renderTasksList.bind(this));
    }

    if (this._showingTasksCount !== 1 && this._tasks.length < this._endTaskRender) {
      removeElement(this._loadMoreButtonComponent);
    }
  }

  _getSortedTasks(sortType) {
    switch (sortType) {
      case SortType.DATE_UP:
        this._sortedTasks.sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        this._sortedTasks.sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        this._sortedTasks = this._tasks.slice();
    }
  }

  _renderTasksList() {
    const taskController = new TaskController(this._tasksListEl);
    const tasksForRender = this._sortedTasks.slice(this._startTaskRender, this._endTaskRender);

    tasksForRender.forEach((task) => taskController.render(task));

    this._controlLoadMoreButton();

    this._startTaskRender += SHOWING_TASKS_COUNT;
    this._endTaskRender += SHOWING_TASKS_COUNT;
  }

  _resetBoard() {
    this._tasksListEl.innerHTML = ``;
    this._startTaskRender = 1;
    this._endTaskRender = this._startTaskRender + SHOWING_TASKS_COUNT;
  }
}

export default BoardController;
