class Tasks {
  constructor() {
    this._tasks = [];
    this._dataChangeHandlers = [];
  }

  getTasks() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
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

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}

export default Tasks;
