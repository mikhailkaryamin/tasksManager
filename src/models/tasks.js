import {FilterType} from '../const.js';
import {getTasksByFilter} from '../utils/filters.js';

class Tasks {
  constructor() {
    this._tasks = [];
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._activeFilterType = FilterType.ALL;
  }

  addTask(task) {
    this._tasks = [].concat(task, this._tasks.slice());
    this._callHandlers(this._dataChangeHandlers);
  }

  getTasks() {
    return getTasksByFilter(this._activeFilterType, this._tasks);
  }

  getAllTasks() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
    this._callHandlers(this._dataChangeHandlers);
  }

  updateTask(id, newTask) {
    const indexTask = this._tasks.findIndex((task) => task.id === id);

    if (indexTask === -1) {
      return false;
    }

    this._tasks = [].concat(this._tasks.slice(0, indexTask), newTask, this._tasks.slice(indexTask + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setActiveFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removeTask(id) {
    const indexTask = this._tasks.findIndex((task) => task.id === id);

    if (indexTask === -1) {
      return false;
    }

    this._tasks = [].concat(this._tasks.slice(0, indexTask), this._tasks.slice(indexTask + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }


}

export default Tasks;
