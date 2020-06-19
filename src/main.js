import BoardController from './controllers/board.js';
import MenuController from './controllers/menu.js';
import Filters from './controllers/filters.js';
import Tasks from './models/tasks.js';
import {generateTasks} from './mock/task.js';
import {TASK_COUNT} from './const.js';

const tasks = generateTasks(TASK_COUNT);

const tasksModel = new Tasks();
tasksModel.setTasks(tasks);

const mainEl = document.querySelector(`.main`);
const boardController = new BoardController(mainEl, tasksModel);
const mainControlEl = mainEl.querySelector(`.main__control`);
const filtersController = new Filters(mainEl, tasksModel);
const menuController = new MenuController(mainControlEl, boardController);
menuController.render();
filtersController.render();
boardController.render();
