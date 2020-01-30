import {getRandom} from './js/util.js';
import {getSiteMenuTemplate} from './js/components/site-menu.js';
import {getSearchTemplate} from './js/components/search.js';
import {getFilterTemplate} from './js/components/filters.js';
import {getBoardTemplate} from './js/components/board.js';
import {getSortTemplate} from './js/components/sort.js';
import {getBoardTasksTemplate} from './js/components/board-tasks.js';
import {getButtonLoadMoreTemplate} from './js/components/button-load-more.js';
import {getCardTaskTemplate} from './js/components/card-task.js';
import {getCardTaskEditTemplate} from './js/components/card-edit-task.js';
import {getTasksList} from './js/taskData.js';
import {getFilters} from './js/filterData.js';

const NUMBER_OF_CARDS = getRandom(25, 3);
const NUMBER_LOAD_CARD = 8;
let startLoadCards = 0;

const tasksData = getTasksList(NUMBER_OF_CARDS);

const templatesMain = [getSiteMenuTemplate(), getSearchTemplate(), getFilterTemplate(getFilters(tasksData)), getBoardTemplate()];

const mainElement = document.querySelector(`.main`);

const renderTemplate = function (elementContainer, template) {
  elementContainer.insertAdjacentHTML(`beforeend`, template);
};

templatesMain.forEach((template) => renderTemplate(mainElement, template));

const boardElement = mainElement.querySelector(`.board`);

renderTemplate(boardElement, getSortTemplate());
renderTemplate(boardElement, getBoardTasksTemplate());

const boardTasksElement = mainElement.querySelector(`.board__tasks`);

const renderTasks = () => {
  if (startLoadCards >= tasksData.length) {
    return;
  }

  let currentLoadTasksList = tasksData.slice(startLoadCards, startLoadCards + NUMBER_LOAD_CARD);

  currentLoadTasksList.forEach((task) => renderTemplate(boardTasksElement, getCardTaskTemplate(task)));
  startLoadCards += NUMBER_LOAD_CARD;

  if (startLoadCards < tasksData.length && startLoadCards === NUMBER_LOAD_CARD) {
    renderTemplate(boardElement, getButtonLoadMoreTemplate());
    const loadMoreElement = boardElement.querySelector(`.load-more`);
    loadMoreElement.addEventListener(`click`, () => renderTasks());
  } else if (startLoadCards >= tasksData.length && startLoadCards > NUMBER_LOAD_CARD) {
    const loadMoreElement = boardElement.querySelector(`.load-more`);
    loadMoreElement.remove();
  }
};

renderTemplate(boardTasksElement, getCardTaskEditTemplate(tasksData[0]));

renderTasks();
