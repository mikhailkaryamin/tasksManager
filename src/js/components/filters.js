const FILTERS = [`all`, `overdue`, `today`, `favorites`, `repeating`, `tags`, `archive`];

export const getFilterTemplate = (filtersData) => {

  return `<section class="main__filter filter container">
            ${FILTERS.map((filter) => `<input
            type="radio"
            id="filter__${filter}"
            class="filter__input visually-hidden"
            name="filter"
            ${filtersData.find((el) => el.title === filter).count ? `checked` : `disabled`}
          />
          <label for="filter__${filter}" class="filter__label">
            ${filter}
            <span class="filter__all-count">
              ${filtersData.find((el) => el.title === filter).count}
            </span></label
          >`).join(``)}
          </section>`;
};
