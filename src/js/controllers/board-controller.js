import {Board} from '../components/board.js';
import {TasksList} from '../components/board-tasks.js';
import {ButtonLoadMore} from '../components/button-load-more.js';
import {CardTask} from '../components/card-task.js';
import {CardEditTask} from '../components/card-edit-task.js';
import {Sort} from '../components/sort.js';
import {render, unrender, isEscKeyDown} from '../utils.js';
import {NUMBER_LOAD_CARD} from '../consts.js';

export class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._filteredTasks = this._tasks;
    this._board = new Board();
    this._boardElement = this._board.getElement();
    this._taskList = new TasksList();
    this._taskListElement = this._taskList.getElement();
    this._sort = new Sort();
    this._buttonLoadMore = new ButtonLoadMore();
    this._startLoadCards = 0;
  }

  init() {
    const sortElement = this._sort.getElement();

    render(this._container, this._boardElement);
    render(this._boardElement, sortElement);
    render(this._boardElement, this._taskListElement);

    const onSortClick = (evt) => {
      this._onSortLinkClick(evt);
    };

    sortElement
      .addEventListener(`click`, onSortClick);

    this._controlRenderTasks();

    if (this._startLoadCards < this._tasks.length) {
      this._renderLoadButtonMore();
    }
  }

  _controlRenderTasks() {
    const filteredTasks = this._filteredTasks;

    let currentLoadTasksList = filteredTasks.slice(this._startLoadCards, this._startLoadCards + NUMBER_LOAD_CARD);

    currentLoadTasksList.forEach((task) => this._renderTask(task));
    this._startLoadCards += NUMBER_LOAD_CARD;

    if (this._startLoadCards >= this._tasks.length && this._startLoadCards > NUMBER_LOAD_CARD) {
      this._unrenderLoadButtonMore();
    }
  }

  _renderLoadButtonMore() {
    const buttonLoadMoreElement = this._buttonLoadMore.getElement();

    render(this._boardElement, buttonLoadMoreElement);
    const loadMoreElement = this._boardElement.querySelector(`.load-more`);
    loadMoreElement.addEventListener(`click`, () => this._controlRenderTasks());
  }

  _unrenderLoadButtonMore() {
    const loadMoreElement = this._boardElement.querySelector(`.load-more`);

    unrender(loadMoreElement);
  }

  _resetTasksList() {
    this._startLoadCards = 0;
    this._filteredTasks = null;

    this._taskList.getElement()
      .querySelectorAll(`.card`)
      .forEach((card) => unrender(card));
  }

  _renderTask(taskMock) {
    const task = new CardTask(taskMock);
    const taskEdit = new CardEditTask(taskMock);
    const taskElement = task.getElement();
    const taskEditElement = taskEdit.getElement();

    const closeTaskEdit = () => {
      this._taskListElement.replaceChild(taskElement, taskEditElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      isEscKeyDown(evt, closeTaskEdit);
    };

    taskElement
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskListElement.replaceChild(taskEditElement, taskElement);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditElement.querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    taskEditElement.querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    taskEditElement
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._taskListElement.replaceChild(taskElement, taskEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._taskListElement, taskElement);
  }

  _onSortLinkClick(evt) {
    this._resetTasksList();

    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        this._filteredTasks = this._tasks
          .slice()
          .sort((a, b) => a.dueDate - b.dueDate);

        this._controlRenderTasks();
        break;

      case `date-down`:
        this._filteredTasks = this._tasks
          .slice()
          .sort((a, b) => b.dueDate - a.dueDate);

        this._controlRenderTasks();
        break;
      case `default`:
        this._filteredTasks = this._tasks;

        this._controlRenderTasks();
        break;
    }
  }
}
