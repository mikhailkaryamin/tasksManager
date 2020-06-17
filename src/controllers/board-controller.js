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
    this._showedTasksController = [];
    this._boardComponent = new BoardComponent();
    this._boardEl = this._boardComponent.getElement();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._noTasksComponent = new NoTasks();
    this._sortComponent = new SortComponent();
    this._tasksListComponent = new TasksListComponent();
    this._tasksListEl = this._tasksListComponent.getElement();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._showingTasksCount = SHOWING_TASKS_COUNT;
  }

  render(tasks) {
    this._tasks = tasks;

    render(this._container, this._boardComponent);

    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);

    if (this._tasks.length === 0 || isAllTasksArchived) {
      render(this._boardEl, this._noTasksComponent.getElement());
      return;
    }

    render(this._boardEl, this._sortComponent);
    render(this._boardEl, this._tasksListComponent);

    this._renderTasksList(this._tasks);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _setCountRender() {
    this._showingTasksCount += SHOWING_TASKS_COUNT;
  }

  _controlLoadMoreButton() {
    const loadMoreClickHandler = () => {
      this._setCountRender();
      this._renderTasksList();
    };

    const isExistLoadMoreButton = this._boardEl.contains(this._loadMoreButtonComponent.getElement());

    if (this._tasks.length > this._showingTasksCount && !isExistLoadMoreButton) {
      render(this._boardEl, this._loadMoreButtonComponent);
      this._loadMoreButtonComponent.setLoadMoreButtonHandler(loadMoreClickHandler);
    }

    if (isExistLoadMoreButton && this._tasks.length < this._showingTasksCount) {
      removeElement(this._loadMoreButtonComponent);
    }
  }

  _getSortedTasks(sortType) {
    let sortedTasks = [];

    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = this._tasks;
    }

    return sortedTasks;
  }

  _onDataChange(taskController, oldData, newData) {
    const indexData = this._tasks.findIndex((data) => data === oldData);
    if (indexData === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, indexData), newData, this._tasks.slice(indexData + 1));
    taskController.render(this._tasks[indexData]);
  }

  _onSortTypeChange(sortType) {
    const sortedTasks = this._getSortedTasks(sortType);
    this._resetBoard();
    this._resetCount();
    this._renderTasksList(sortedTasks);
  }

  _onViewChange() {
    this._showedTasksController.forEach((taskController) => taskController.setDefaultView());
  }

  _renderTasksList(tasks) {
    const tasksForRender = tasks.slice(0, this._showingTasksCount);

    this._resetBoard();

    tasksForRender.forEach((task) => {
      const taskController = new TaskController(this._tasksListEl, this._onDataChange, this._onViewChange);
      this._showedTasksController.push(taskController);
      taskController.render(task);
    });

    this._controlLoadMoreButton();
  }

  _resetBoard() {
    this._tasksListEl.innerHTML = ``;
    this._showedTasksController.length = 0;
  }

  _resetCount() {
    this._showingTasksCount = SHOWING_TASKS_COUNT;
  }
}

export default BoardController;
