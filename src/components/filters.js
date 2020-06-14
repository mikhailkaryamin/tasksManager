import AbstractComponent from './abstract-component.js';

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
  const filterMarkup = filters.map((it, i) => createFilterMarkup(it, i === 0)).join(`\n`);

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
}

export default Filters;
