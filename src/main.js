import {getRandom, render, isEscKeyDown, unrender} from './js/utils.js';
import {SiteMenu} from './js/components/site-menu.js';
import {Search} from './js/components/search.js';
import {Filters} from './js/components/filters.js';
import {Board} from './js/components/board.js';
import {Sort} from './js/components/sort.js';
import {BoardTasks} from './js/components/board-tasks.js';
import {ButtonLoadMore} from './js/components/button-load-more.js';
import {CardTask} from './js/components/card-task.js';
import {CardEditTask} from './js/components/card-edit-task.js';
import {getTasksList} from './js/taskData.js';
import {getFilters} from './js/filterData.js';

const NUMBER_OF_CARDS = getRandom(25, 3);
const NUMBER_LOAD_CARD = 8;
let startLoadCards = 0;

const tasksData = getTasksList(NUMBER_OF_CARDS);

const siteMenu = new SiteMenu();
const search = new Search();
const filters = new Filters(getFilters(tasksData));
const board = new Board();
const sort = new Sort();
const boardTasks = new BoardTasks();
const buttonLoadMore = new ButtonLoadMore();

const mainElement = document.querySelector(`.main`);

render(mainElement, siteMenu.getElement());
render(mainElement, search.getElement());
render(mainElement, filters.getElement());
render(mainElement, board.getElement());

const boardElement = mainElement.querySelector(`.board`);

render(boardElement, sort.getElement());
render(boardElement, boardTasks.getElement());

const boardTasksElement = mainElement.querySelector(`.board__tasks`);

const renderTask = (taskMock) => {
  const task = new CardTask(taskMock);
  const taskEdit = new CardEditTask(taskMock);

  const closeTaskEdit = () => {
    boardTasksElement.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    isEscKeyDown(evt, closeTaskEdit);
  };

  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      boardTasksElement.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  taskEdit.getElement()
    .querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      boardTasksElement.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(boardTasksElement, task.getElement());
};

const renderTasks = () => {
  if (startLoadCards >= tasksData.length) {
    return;
  }

  let currentLoadTasksList = tasksData.slice(startLoadCards, startLoadCards + NUMBER_LOAD_CARD);

  currentLoadTasksList.forEach((task) => renderTask(task));
  startLoadCards += NUMBER_LOAD_CARD;

  if (startLoadCards < tasksData.length && startLoadCards === NUMBER_LOAD_CARD) {
    render(boardElement, buttonLoadMore.getElement());

    const loadMoreElement = boardElement.querySelector(`.load-more`);
    loadMoreElement.addEventListener(`click`, () => renderTasks());
  } else if (startLoadCards >= tasksData.length && startLoadCards > NUMBER_LOAD_CARD) {
    const loadMoreElement = boardElement.querySelector(`.load-more`);

    unrender(loadMoreElement);
  }
};

renderTasks();
