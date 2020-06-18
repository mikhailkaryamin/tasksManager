import AbstractComponent from './abstract-component.js';
import {FILTER_ID_PREFIX} from '../const.js';

const getFilterNameById = (id) => {
  return id.substring(FILTER_ID_PREFIX.length);
};

const createFilterMarkup = (filter, isChecked) => {
  const {
    count,
    name,
  } = filter;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name}
      <span class="filter__${name}-count">
        ${count}
      </span>
    </label>`
  );
};

const createFiltersTemplate = (filters) => {
  const filterMarkup = filters.map((it) => createFilterMarkup(it, it.checked)).join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filterMarkup}
    </section>`
  );
};

class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters);
  }

  setFilterChange(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const filterName = getFilterNameById(evt.target.id);
      handler(filterName);
    });

  }
}

export default Filters;
