import BoardComponent from './components/board.js';
import CardTaskComponent from './components/card-task.js';
import CardTaskEditComponent from './components/card-task-edit.js';
import FiltersComponent from './components/filters.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import MenuComponent from './components/menu.js';
import SortComponent from './components/sort.js';
import TasksListComponent from './components/tasks-list.js';
import NoTasks from './components/no-tasks.js';

import BoardController from './controllers/board-controller.js';

import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/task.js';
import {
  TASK_COUNT,
  SHOWING_TASKS_COUNT,
  Sing,
} from './const.js';
import {
  onEscKeyDown,
} from './utils/common.js';
import {
  render,
  removeElement,
  replaceElement,
} from './utils/render.js';

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

const menuComponent = new MenuComponent();
const boardComponent = new BoardComponent();
const filtersComponent = new FiltersComponent(filters);
const loadMoreButtonComponent = new LoadMoreButtonComponent();
const sortComponent = new SortComponent();
const tasksListComponent = new TasksListComponent();
const noTasksComponent = new NoTasks();


const boardEl = boardComponent.getElement();

const mainEl = document.querySelector(`.main`);
const boardController = new BoardController(mainEl);
const mainControlEl = mainEl.querySelector(`.main__control`);

render(mainControlEl, menuComponent);
render(mainEl, filtersComponent);


// const renderTask = (tasksListEl, task) => {
//   const cardTask = new CardTaskComponent(task);
//   const cardTaskEdit = new CardTaskEditComponent(task);

//   const onCloseEdit = (evt) => {
//     onEscKeyDown(evt, replaceEditToTask);
//   };

//   const replaceTaskToEdit = () => {
//     replaceElement(cardTaskEdit, cardTask);
//   };

//   const replaceEditToTask = () => {
//     replaceElement(cardTask, cardTaskEdit);
//   };

//   cardTaskEdit.setSubmitHandler(() => {
//     replaceEditToTask();
//     document.removeEventListener(`keydown`, onCloseEdit);
//   });

//   cardTask.setEditButtonHandler(() => {
//     replaceTaskToEdit();
//     document.addEventListener(`keydown`, onCloseEdit);
//   });

//   render(tasksListEl, cardTask);
// };

// const renderLoadMoreButton = (sing) => {
//   const boardEl = boardComponent.getElement();

//   if (sing === Sing.RENDER) {
//     render(boardEl, loadMoreButtonComponent);
//     loadMoreButtonComponent.setLoadMoreButtonHandler(renderBoard);
//   }

//   if (sing === Sing.REMOVE) {
//     removeElement(loadMoreButtonComponent);
//   }
// };

// let renderedTasksCount = 1;

// const renderBoard = () => {
//   const startTaskRender = renderedTasksCount;
//   const endTaskRender = renderedTasksCount + SHOWING_TASKS_COUNT;
//   const tasksForRender = tasks.slice(startTaskRender, endTaskRender);

//   render(mainEl, boardComponent);

//   if (tasks.length === 0) {
//     render(boardEl, noTasksComponent.getElement());
//     return;
//   }

//   render(boardEl, sortComponent);
//   render(boardEl, tasksListComponent);

//   const tasksListEl = tasksListComponent.getElement();
//   tasksForRender.forEach((task) => renderTask(tasksListEl, task));

//   if (tasks.length > endTaskRender) {
//     renderLoadMoreButton(Sing.RENDER);
//   }

//   if (renderedTasksCount !== 1 && tasks.length < endTaskRender) {
//     renderLoadMoreButton(Sing.REMOVE);
//   }

//   renderedTasksCount += SHOWING_TASKS_COUNT;
// };

boardController.render();
// renderBoard(mainEl);
