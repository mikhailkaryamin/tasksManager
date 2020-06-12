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
import {
  TASK_COUNT,
  SHOWING_TASKS_COUNT,
} from './const.js';

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const renderTemplate = (container, template, position = `beforeend`) => {
  container.insertAdjacentHTML(position, template);
};

let taskCountRendered = 1;

const renderTasks = () => {
  const startTaskRender = taskCountRendered;
  const finishTaskRender = taskCountRendered + SHOWING_TASKS_COUNT;
  const tasksForRender = tasks.slice(startTaskRender, finishTaskRender);

  tasksForRender.forEach((task) => renderTemplate(tasksListEl, createCardTaskTemplate(task)));

  if (taskCountRendered === 1 && tasks.length > finishTaskRender) {
    renderLoadMoreButton(`render`);
  }
  if (taskCountRendered !== 1 && tasks.length < finishTaskRender) {
    renderLoadMoreButton(`remove`);
  }

  taskCountRendered += SHOWING_TASKS_COUNT;
};

const renderLoadMoreButton = (sing) => {
  if (sing === `render`) {
    renderTemplate(boardEl, createLoadMoreButtonTemplate());

    const loadMoreButtonEl = boardEl.querySelector(`.load-more`);
    loadMoreButtonEl.addEventListener(`click`, renderTasks);
  }

  if (sing === `remove`) {
    const loadMoreButtonEl = boardEl.querySelector(`.load-more`);
    loadMoreButtonEl.remove();
  }
};

const mainEl = document.querySelector(`.main`);
const mainControlEl = mainEl.querySelector(`.main__control`);

renderTemplate(mainControlEl, createMenuTemplate());
renderTemplate(mainEl, createFiltersTemplate(filters));
renderTemplate(mainEl, createBoardTemplate());

const boardEl = mainEl.querySelector(`.board`);

renderTemplate(boardEl, createSortTemplate());
renderTemplate(boardEl, createTasksListTemplate());

const tasksListEl = boardEl.querySelector(`.board__tasks`);

renderTemplate(tasksListEl, createCardTaskEditTemplate(tasks[0]));

renderTasks();
