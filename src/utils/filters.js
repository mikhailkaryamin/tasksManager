import {
  isRepeating,
  isOverdue,
  isToday,
} from './common.js';
import {FilterType} from '../const.js';

const getArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchive);
};

const getFavoriteTasks = (tasks) => {
  return tasks.filter((task) => task.isFavorite);
};

const getNotArchiveTasks = (tasks) => {
  return tasks.filter((task) => !task.isArchive);
};

const getOverdueTasks = (tasks) => {
  return tasks.filter((task) => isOverdue(task.dueDate));
};

const getRepeatingTasks = (tasks) => {
  return tasks.filter((task) => isRepeating(task.repeatingDays));
};

const getTodayTasks = (tasks) => {
  return tasks.filter((task) => isToday(task.dueDate));
};

const getTasksByFilter = (filterType, tasks) => {
  switch (filterType) {
    case (FilterType.ALL):
      return getNotArchiveTasks(tasks);
    case (FilterType.ARCHIVE):
      return getArchiveTasks(tasks);
    case (FilterType.FAVORITES):
      return getFavoriteTasks(tasks);
    case (FilterType.OVERDUE):
      return getOverdueTasks(tasks);
    case (FilterType.REPEATING):
      return getRepeatingTasks(tasks);
    case (FilterType.TODAY):
      return getTodayTasks(tasks);
  }
  return tasks;
};

export {
  getTasksByFilter
};
