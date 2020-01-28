import {hasValueObj} from './util.js';

export const getFilters = (tasks) => ([
  {
    title: `ALL`,
    count: tasks.length
  },
  {
    title: `OVERDUE`,
    count: tasks.reduce((acc, it) => (it.dueDate < Date.now()) ? acc + 1 : acc, 0)
  },
  {
    title: `TODAY`,
    count: tasks.reduce((acc, it) => (it.dueDate.toDateString() === new Date(Date.now()).toDateString()) ? acc + 1 : acc, 0)
  },
  {
    title: `FAVORITES`,
    count: tasks.reduce((acc, it) => it.isFavorite ? acc + 1 : acc, 0)
  },
  {
    title: `REPEATING`,
    count: tasks.reduce((acc, it) => hasValueObj(it.repeatingDays, true) ? acc + 1 : acc, 0)
  },
  {
    title: `TAGS`,
    count: tasks.reduce((acc, it) => (it.tags.length !== 0) ? acc + 1 : acc, 0)
  },
  {
    title: `ARCHIVE`,
    count: tasks.reduce((acc, it) => (it.isArchive) ? acc + 1 : acc, 0)
  },
]);

