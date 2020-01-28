const MS_IN_WEEK = 86400000;
import {getRandom} from './util.js';

const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][getRandom(2)],
  dueDate: new Date(Date.now() + getRandom(7, -7) * MS_IN_WEEK),
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': Boolean(getRandom(1)),
    'th': false,
    'fr': Boolean(getRandom(1)),
    'sa': Boolean(getRandom(1)),
    'su': false
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][getRandom(4)],
  isFavorite: Boolean(getRandom(1)),
  isArchive: Boolean(getRandom(1))
});

export const getTasksList = (numberTasks) => {
  let tasksList = [];

  for (let i = 0; i < numberTasks; i++) {
    tasksList.push(getTask());
  }

  return tasksList;
};
