import BoardController from './controllers/board.js';
import MenuComponent from './components/menu.js';
import Filters from './controllers/filters.js';
import Tasks from './models/tasks.js';
import {render} from './utils/render.js';
import {generateTasks} from './mock/task.js';
import {TASK_COUNT} from './const.js';

const tasks = generateTasks(TASK_COUNT);

const tasksModel = new Tasks();
tasksModel.setTasks(tasks);

const menuComponent = new MenuComponent();

const mainEl = document.querySelector(`.main`);
const boardController = new BoardController(mainEl, tasksModel);
const mainControlEl = mainEl.querySelector(`.main__control`);
const filtersController = new Filters(mainEl, tasksModel);
render(mainControlEl, menuComponent);
filtersController.render();
boardController.render();
