import API from './api/index.js';
import BoardController from './controllers/board.js';
import Filters from './controllers/filters.js';
import MenuController from './controllers/menu.js';
import Provider from './api/provider.js';
import Statistic from './components/statistics.js';
import Store from './api/store.js';
import TasksModel from './models/tasks.js';
import {
  MenuItem,
} from './const.js';
import {render} from './utils/render.js';

const AUTHORIZATION = `Basic dXNlckBwYXSAfsafsafd`;
const CONTROL_MENU_ID_PREFIX = `control__`;
const END_POINT = `https://11.ecmascript.pages.academy/task-manager`;
const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const TAG_INPUT = `INPUT`;

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

const api = new API(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const tasksModel = new TasksModel();

const mainEl = document.querySelector(`.main`);
const mainControlEl = mainEl.querySelector(`.main__control`);
const menuController = new MenuController(mainControlEl, onPressButtonMenu);
const boardController = new BoardController(mainEl, tasksModel, apiWithProvider);
const filtersController = new Filters(mainEl, tasksModel);
const statisticComponent = new Statistic({tasks: tasksModel, dateFrom, dateTo});

menuController.render();
filtersController.render();
render(mainEl, statisticComponent);
statisticComponent.hide();

const controlPagesMenu = (pageName) => {
  switch (pageName) {
    case (MenuItem.NEW_TASK):
      statisticComponent.hide();
      boardController.show();
      boardController.addNewTask();
      break;
    case (MenuItem.TASKS):
      statisticComponent.hide();
      boardController.show();
      break;
    case (MenuItem.STATISTICS):
      boardController.hide();
      statisticComponent.show();
      break;
  }
};

apiWithProvider.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(tasks);
    boardController.render();
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
    }).catch(() => {
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
