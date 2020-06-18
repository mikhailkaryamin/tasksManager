import FiltersComponent from '../components/filters.js';
import {FilterType} from '../const.js';
import {
  render,
  replaceElement,
} from '../utils/render.js';
import {getTasksByFilter} from '../utils/filters.js';

class Filters {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;

    this._activeFilterType = FilterType.ALL;
    this._filterComponent = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._tasksModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allTasks = this._tasksModel.getAllTasks();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getTasksByFilter(filterType, allTasks).length,
        checked: filterType === this._activeFilterType,
      };
    });

    const oldComponent = this._filterComponent;
    this._filterComponent = new FiltersComponent(filters);

    if (oldComponent) {
      replaceElement(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent);
    }

    this._filterComponent.setFilterChange(this._onFilterChange);
  }

  _onFilterChange(filterType) {
    this._tasksModel.setActiveFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}

export default Filters;
