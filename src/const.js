const DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const DESCRIPTION_ITEMS = [
  `Est tempor sint est nostrud nostrud exercitation.`,
  `Exercitation consequat elit irure eu magna proident commodo.`,
  `Amet ad reprehenderit est eiusmod esse.`,
];
const TASK_COUNT = 50;
const FILTER_ID_PREFIX = `filter__`;
const SortType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};
const FilterType = {
  ALL: `all`,
  OVERDUE: `overdue`,
  TODAY: `today`,
  FAVORITES: `favorites`,
  REPEATING: `repeating`,
  ARCHIVE: `archive`,
};
const SHOWING_TASKS_COUNT = 8;

export {
  COLORS,
  DAYS,
  DESCRIPTION_ITEMS,
  FilterType,
  FILTER_ID_PREFIX,
  SHOWING_TASKS_COUNT,
  SortType,
  TASK_COUNT,
};
