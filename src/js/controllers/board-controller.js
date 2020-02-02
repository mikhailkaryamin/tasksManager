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
    this._board = new Board();
    this._taskList = new TasksList();
    this._sort = new Sort();
    this._buttonLoadMore = new ButtonLoadMore();
    this._startLoadCards = 0;
  }

  init() {
    const tasks = this._tasks;
    const boardElement = this._board.getElement();
    const tasksListElement = this._taskList.getElement();
    const sortElement = this._sort.getElement();
    const buttonLoadMoreElement = this._buttonLoadMore.getElement();

    render(this._container, boardElement);
    render(boardElement, sortElement);
    render(boardElement, tasksListElement);

    let currentLoadTasksList = tasks.slice(this._startLoadCards, this._startLoadCards + NUMBER_LOAD_CARD);

    currentLoadTasksList.forEach((task) => this._renderTask(task));
    this._startLoadCards += NUMBER_LOAD_CARD;

    if (this._startLoadCards < tasks.length) {
      render(boardElement, buttonLoadMoreElement);

      if (this._startLoadCards === NUMBER_LOAD_CARD) {
        const loadMoreElement = boardElement.querySelector(`.load-more`);
        loadMoreElement.addEventListener(`click`, () => this.init());
      }

    } else if (this._startLoadCards >= tasks.length && this._startLoadCards > NUMBER_LOAD_CARD) {
      const loadMoreElement = boardElement.querySelector(`.load-more`);

      unrender(loadMoreElement);
    }
  }

  _renderTask(taskMock) {
    const task = new CardTask(taskMock);
    const taskEdit = new CardEditTask(taskMock);

    const tasksListElement = this._taskList.getElement();
    const taskElement = task.getElement();
    const taskEditElement = taskEdit.getElement();

    const closeTaskEdit = () => {
      tasksListElement.replaceChild(taskElement, taskEditElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      isEscKeyDown(evt, closeTaskEdit);
    };

    taskElement
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        tasksListElement.replaceChild(taskEditElement, taskElement);
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
        tasksListElement.replaceChild(taskElement, taskEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(tasksListElement, taskElement);
  }
}
