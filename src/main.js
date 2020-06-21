import API from './api.js';
import BoardController from './controllers/board.js';
import Filters from './controllers/filters.js';
import MenuController from './controllers/menu.js';
import Tasks from './models/tasks.js';
import Statistic from './components/statistics.js';
import {
  CONTROL_MENU_ID_PREFIX,
  TAG_INPUT,
  MenuItem,
} from './const.js';
import {render} from './utils/render.js';

const AUTHORIZATION = `Basic dXNlckBwYXSAfsafsafd`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;

const api = new API(END_POINT, AUTHORIZATION);

const tasksModel = new Tasks();

const onPressButtonMenu = (evt) => {
  if (evt.target.tagName === TAG_INPUT) {
    const pageName = evt.target.id.substring(CONTROL_MENU_ID_PREFIX.length);
    controlPagesMenu(pageName);
  }
};

const dateTo = new Date();
const dateFrom = (() => {
  const d = new Date(dateTo);
  d.setDate(d.getDate() - 7);
  return d;
})();

const mainEl = document.querySelector(`.main`);
const mainControlEl = mainEl.querySelector(`.main__control`);
const menuController = new MenuController(mainControlEl, onPressButtonMenu);
const boardController = new BoardController(mainEl, tasksModel, api);
const filtersController = new Filters(mainEl, tasksModel);
const statisticComponent = new Statistic({tasks: tasksModel, dateFrom, dateTo});

menuController.render();
filtersController.render();
render(mainEl, statisticComponent);
statisticComponent.hide();

const controlPagesMenu = (pageName) => {
  switch (pageName) {
    case (MenuItem.NEW_TASK):
      boardController.show();
      statisticComponent.hide();
      boardController.addNewTask();
      break;
    case (MenuItem.TASKS):
      boardController.show();
      statisticComponent.hide();
      break;
    case (MenuItem.STATISTICS):
      statisticComponent.show();
      boardController.hide();
      break;
  }
};

api.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });

