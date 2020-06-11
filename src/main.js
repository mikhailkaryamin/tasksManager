import {createBoardTemplate} from './components/board.js';
import {createCardTaskTemplate} from './components/card-task.js';
import {createCardTaskEditTemplate} from './components/card-task-edit.js';
import {createFiltersTemplate} from './components/filters.js';
import {createLoadMoreButtonTemplate} from './components/load-more-button.js';
import {createMenuTemplate} from './components/menu.js';
import {createSortTemplate} from './components/sort.js';
import {createTasksListTemplate} from './components/tasks-list.js';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/task.js';

const TASK_COUNT = 3;

const renderTemplate = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

const mainEl = document.querySelector(`.main`);
const mainControlEl = mainEl.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

renderTemplate(mainControlEl, createMenuTemplate());
renderTemplate(mainEl, createFiltersTemplate(filters));
renderTemplate(mainEl, createBoardTemplate());

const boardEl = mainEl.querySelector(`.board`);

renderTemplate(boardEl, createSortTemplate());
renderTemplate(boardEl, createTasksListTemplate());

const tasksListEl = boardEl.querySelector(`.board__tasks`);

renderTemplate(tasksListEl, createCardTaskEditTemplate(tasks[0]));

for (let i = 0; i < tasks.length; i++) {
  renderTemplate(tasksListEl, createCardTaskTemplate(tasks[i]));
}

renderTemplate(boardEl, createLoadMoreButtonTemplate());
