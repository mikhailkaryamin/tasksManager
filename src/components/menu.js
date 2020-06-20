import AbstractComponent from './abstract-component.js';
import {MenuItem} from '../const.js';

const MenuDescription = {
  NEW_TASK: `+ ADD NEW TASK`,
  TASKS: `TASKS`,
  STATISTICS: `STATISTICS`,
};

const createMenuMarkup = (type, description) => {
  return (
    `<input
      type="radio"
      name="control"
      id="control__${type}"
      class="control__input visually-hidden"
    />
    <label
      for="control__${type}"
      class="control__label ${type === MenuItem.NEW_TASK ? `control__label--new-task` : ``}"
    >
      ${description}
    </label
    >`
  );
};


const createMenuTemplate = () => {
  const menuTemplate = Object.keys(MenuItem).map((type) => {
    return createMenuMarkup(MenuItem[type], MenuDescription[type]);
  }).join(``);

  return (
    `<section class="control__btn-wrap">
      ${menuTemplate}
    </section>`
  );
};

class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setMenuClickHandler(cb) {
    this.getElement().addEventListener(`click`, cb);
  }

  // setAddButtonHandler(cb) {
  //   this.getElement().querySelector(`.control__label--new-task`).addEventListener(`click`, cb);
  // }

  // setTasksButtonHandler(cb) {
  //   this.getElement().querySelector(`.control__label-task`).addEventListener(`click`, cb);
  // }

  // setStatisticButtonHandler(cb) {
  //   this.getElement().querySelector(`.control__label-statistic`).addEventListener(`click`, cb);
  // }
}

export default Menu;
