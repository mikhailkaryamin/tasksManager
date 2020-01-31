import {hasValueObj} from './utils.js';

export const getFilters = (tasks) => ([
  {
    title: `all`,
    count: tasks.length
  },
  {
    title: `overdue`,
    count: tasks.reduce((acc, it) => (it.dueDate < Date.now()) ? acc + 1 : acc, 0)
  },
  {
    title: `today`,
    count: tasks.reduce((acc, it) => (it.dueDate.toDateString() === new Date(Date.now()).toDateString()) ? acc + 1 : acc, 0)
  },
  {
    title: `favorites`,
    count: tasks.reduce((acc, it) => it.isFavorite ? acc + 1 : acc, 0)
  },
  {
    title: `repeating`,
    count: tasks.reduce((acc, it) => hasValueObj(it.repeatingDays, true) ? acc + 1 : acc, 0)
  },
  {
    title: `tags`,
    count: tasks.reduce((acc, it) => (it.tags.length !== 0) ? acc + 1 : acc, 0)
  },
  {
    title: `archive`,
    count: tasks.reduce((acc, it) => (it.isArchive) ? acc + 1 : acc, 0)
  },
]);

