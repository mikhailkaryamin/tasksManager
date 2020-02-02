import {render} from './js/utils.js';
import {NUMBER_OF_CARDS} from './js/consts.js';
import {SiteMenu} from './js/components/site-menu.js';
import {Search} from './js/components/search.js';
import {Filters} from './js/components/filters.js';
import {getTasksList} from './js/taskData.js';
import {getFilters} from './js/filterData.js';
import {BoardController} from './js/controllers/board-controller.js';

const tasksData = getTasksList(NUMBER_OF_CARDS);

const siteMenu = new SiteMenu();
const search = new Search();
const filters = new Filters(getFilters(tasksData));

const mainElement = document.querySelector(`.main`);

render(mainElement, siteMenu.getElement());
render(mainElement, search.getElement());
render(mainElement, filters.getElement());

const boardController = new BoardController(mainElement, tasksData);
boardController.init();
