import BoardComponent from './components/board.js';
import CardTaskComponent from './components/card-task.js';
import CardTaskEditComponent from './components/card-task-edit.js';
import FiltersComponent from './components/filters.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import MenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import TasksListComponent from './components/tasks-list.js';
import NoTasks from './components/no-tasks.js';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/task.js';
import {
  TASK_COUNT,
  SHOWING_TASKS_COUNT,
  Sing,
} from './const.js';
import {
  render,
  onEscKeyDown,
} from './utils.js';

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const menuComponent = new MenuComponent();
const boardComponent = new BoardComponent();
const filtersComponent = new FiltersComponent(filters);
const loadMoreButtonComponent = new LoadMoreButtonComponent();
const sortComponent = new SortComponent();
const tasksListComponent = new TasksListComponent();
const noTasksComponent = new NoTasks();

const mainEl = document.querySelector(`.main`);
const mainControlEl = mainEl.querySelector(`.main__control`);

render(mainControlEl, menuComponent.getElement());
render(mainEl, filtersComponent.getElement());

const renderTask = (tasksListEl, task) => {
  const cardTaskEl = new CardTaskComponent(task).getElement();
  const cardTaskEditEl = new CardTaskEditComponent(task).getElement();

  const editButtonEl = cardTaskEl.querySelector(`.card__btn--edit`);
  const saveButtonEl = cardTaskEditEl.querySelector(`.card__save`);

  const onCloseEdit = (evt) => {
    onEscKeyDown(evt, replaceEditToTask);
  };

  const replaceTaskToEdit = () => {
    tasksListEl.replaceChild(cardTaskEditEl, cardTaskEl);
    editButtonEl.removeEventListener(`click`, replaceTaskToEdit);

    document.addEventListener(`keydown`, onCloseEdit);
    saveButtonEl.addEventListener(`click`, replaceEditToTask);
  };

  const replaceEditToTask = () => {
    tasksListEl.replaceChild(cardTaskEl, cardTaskEditEl);

    editButtonEl.addEventListener(`click`, replaceTaskToEdit);
    saveButtonEl.removeEventListener(`click`, replaceEditToTask);
  };

  editButtonEl.addEventListener(`click`, replaceTaskToEdit);

  render(tasksListEl, cardTaskEl);
};

const renderLoadMoreButton = (sing) => {
  const boardEl = boardComponent.getElement();

  if (sing === Sing.RENDER) {
    render(boardEl, loadMoreButtonComponent.getElement());
    const loadMoreButtonEl = boardEl.querySelector(`.load-more`);
    loadMoreButtonEl.addEventListener(`click`, renderBoard);
  }

  if (sing === Sing.REMOVE) {
    const loadMoreButtonEl = boardEl.querySelector(`.load-more`);
    loadMoreButtonEl.remove();
  }
};

let renderedTasksCount = 1;

const renderBoard = () => {
  const startTaskRender = renderedTasksCount;
  const endTaskRender = renderedTasksCount + SHOWING_TASKS_COUNT;
  const tasksForRender = tasks.slice(startTaskRender, endTaskRender);

  const boardEl = boardComponent.getElement();

  render(mainEl, boardEl);

  if (tasks.length === 0) {
    render(boardEl, noTasksComponent.getElement());
    return;
  }

  render(boardEl, sortComponent.getElement());
  render(boardEl, tasksListComponent.getElement());

  const tasksListEl = boardEl.querySelector(`.board__tasks`);
  tasksForRender.forEach((task) => renderTask(tasksListEl, task));

  if (tasks.length > endTaskRender) {
    renderLoadMoreButton(Sing.RENDER);
  }

  if (renderedTasksCount !== 1 && tasks.length < endTaskRender) {
    renderLoadMoreButton(Sing.REMOVE);
  }

  renderedTasksCount += SHOWING_TASKS_COUNT;
};

renderBoard();
