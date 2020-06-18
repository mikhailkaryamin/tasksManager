import AbstractComponent from './abstract-component.js';
import {
  isOverdue,
  isRepeating,
} from '../utils/common.js';

const TypeButton = {
  EDIT: `edit`,
  ARCHIVE: `archive`,
  FAVORITES: `favorites`
};

const createCardTaskTemplate = (task) => {
  const {
    description,
    dueDate,
    color,
    repeatingDays,
    isArchive,
    isFavorite,
  } = task;

  const isDateShowing = !!dueDate;

  const formatDate = {
    day: `numeric`,
    month: `long`,
  };

  const formatTime = {
    hour: `numeric`,
    minute: `numeric`,
  };

  const date = isDateShowing ? `${dueDate.toLocaleString(`en-GB`, formatDate)}` : ``;
  const time = isDateShowing ? `${dueDate.toLocaleString(`en-GB`, formatTime)}` : ``;

  const repeatClass = isRepeating(repeatingDays) ? `card--repeat` : ``;
  const deadlineClass = isOverdue(dueDate) ? `card--deadline` : ``;

  const getControlButton = (typeButton, isActive = true) => {
    return (
      `<button type="button" class="card__btn card__btn--${typeButton} ${isActive ? `` : `card__btn--disabled`}">
        ${typeButton}
      </button>`
    );
  };

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${getControlButton(TypeButton.EDIT)}
            ${getControlButton(TypeButton.ARCHIVE, isArchive)}
            ${getControlButton(TypeButton.FAVORITES, isFavorite)}
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

class CardTask extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createCardTaskTemplate(this._task);
  }

  setEditButtonHandler(cb) {
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, cb);
  }

  setFavoriteButtonHandler(cb) {
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, cb);
  }

  setArchiveButtonHandler(cb) {
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, cb);
  }
}

export default CardTask;
