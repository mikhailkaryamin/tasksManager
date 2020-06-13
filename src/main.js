import BoardComponent from './components/board.js';
import CardTaskComponent from './components/card-task.js';
import CardTaskEditComponent from './components/card-task-edit.js';
import FiltersComponent from './components/filters.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import MenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import TasksListComponent from './components/tasks-list.js';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/task.js';
import {
  TASK_COUNT,
  SHOWING_TASKS_COUNT,
  Sing,
  NodePosition,
} from './const.js';

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const Menu = new MenuComponent().getElement();
const Board = new BoardComponent().getElement();
const Filters = new FiltersComponent(filters).getElement();
const LoadMoreButton = new LoadMoreButtonComponent().getElement();
const Sort = new SortComponent().getElement();
const TasksList = new TasksListComponent().getElement();

const render = (container, template, position = NodePosition.APPEND) => {
  switch (position) {
    case NodePosition.APPEND:
      container.append(template);
      break;
    case NodePosition.PREPEND:
      container.prepend(template);
      break;
  }
};

let taskCountRendered = 1;

const renderTasks = () => {
  const startTaskRender = taskCountRendered;
  const endTaskRender = taskCountRendered + SHOWING_TASKS_COUNT;
  const tasksForRender = tasks.slice(startTaskRender, endTaskRender);

  tasksForRender.forEach((task) => render(tasksListEl, new CardTaskComponent(task).getElement()));

  if (taskCountRendered === 1 && tasks.length > endTaskRender) {
    renderLoadMoreButton(Sing.RENDER);
  }
  if (taskCountRendered !== 1 && tasks.length < endTaskRender) {
    renderLoadMoreButton(Sing.REMOVE);
  }

  taskCountRendered += SHOWING_TASKS_COUNT;
};

const renderLoadMoreButton = (sing) => {
  if (sing === Sing.RENDER) {
    render(boardEl, LoadMoreButton);

    const loadMoreButtonEl = boardEl.querySelector(`.load-more`);
    loadMoreButtonEl.addEventListener(`click`, renderTasks);
  }

  if (sing === Sing.REMOVE) {
    const loadMoreButtonEl = boardEl.querySelector(`.load-more`);
    loadMoreButtonEl.remove();
  }
};

const mainEl = document.querySelector(`.main`);
const mainControlEl = mainEl.querySelector(`.main__control`);

render(mainControlEl, Menu);
render(mainEl, Filters);
render(mainEl, Board);

const boardEl = mainEl.querySelector(`.board`);

render(boardEl, Sort);
render(boardEl, TasksList);

const tasksListEl = boardEl.querySelector(`.board__tasks`);

render(tasksListEl, new CardTaskEditComponent(tasks[0]).getElement());

renderTasks();
