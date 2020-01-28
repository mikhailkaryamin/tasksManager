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

const NUMBER_OF_CARDS = 3;

const tasksData = getTasksList(NUMBER_OF_CARDS);

const templatesMain = [getSiteMenuTemplate(), getSearchTemplate(), getFilterTemplate(getFilters(tasksData)), getBoardTemplate()];
const templatesBoard = [getSortTemplate(), getBoardTasksTemplate(), getButtonLoadMoreTemplate()];

const mainElement = document.querySelector(`.main`);

const renderTemplate = function (elementContainer, template) {
  elementContainer.insertAdjacentHTML(`beforeend`, template);
};

templatesMain.forEach((template) => renderTemplate(mainElement, template));

const boardElement = mainElement.querySelector(`.board`);

templatesBoard.forEach((template) => renderTemplate(boardElement, template));

const boardTasksElement = mainElement.querySelector(`.board__tasks`);

renderTemplate(boardTasksElement, getCardTaskEditTemplate());

for (let i = 0; i < NUMBER_OF_CARDS; i++) {
  renderTemplate(boardTasksElement, getCardTaskTemplate(tasksData[i]));
}
