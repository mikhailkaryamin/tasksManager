import {createElement} from '../utils.js';

const FILTERS = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

export class Filters {
  constructor(filtersData) {
    this._filtersData = filtersData;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<section class="main__filter filter container">
              ${FILTERS.map((filter) => `<input
              type="radio"
              id="filter__${filter}"
              class="filter__input visually-hidden"
              name="filter"
              ${this._filtersData.find((el) => el.title === filter).count ? `checked` : `disabled`}
            />
            <label for="filter__${filter}" class="filter__label">
              ${filter}
              <span class="filter__all-count">
                ${this._filtersData.find((el) => el.title === filter).count}
              </span></label
            >`).join(``)}
            </section>`;
  }
}
