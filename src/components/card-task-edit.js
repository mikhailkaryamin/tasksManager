import AbstractSmartComponent from "./abstract-smart-component.js";
import flatpickr from "flatpickr";
import {encode} from "he";
import "flatpickr/dist/themes/light.css";
import {
  DAYS,
  COLORS,
  MIN_DESCRIPTION_LENGTH,
  MAX_DESCRIPTION_LENGTH,
} from "../const.js";
import {
  isOverdue,
  isRepeating,
} from '../utils/common.js';

const createColorMarkup = (colors, currentColor) => {
  return colors
    .map((color, index) => {
      return (
        `<input
          type="radio"
          id="color-${color}-${index}"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${currentColor === color ? `checked` : ``}
        />
        <label
          for="color-${color}-${index}"
          class="card__color card__color--${color}"
          >${color}</label
        >`
      );
    }).join(`\n`);
};

const createRepeatingDaysMarkup = (days, repeatingDays) => {
  return days
    .map((day, index) => {
      const isChecked = repeatingDays[day];
      return (
        `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-${index}"
          name="repeat"
          value="${day}"
          ${isChecked ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-${index}"
          >${day}</label
        >`
      );
    }).join(`\n`);
};

class CardTaskEdit extends AbstractSmartComponent {
  constructor(task) {
    super();
    this._task = task;
    this._submitHandler = null;
    this._deleteButtonHandler = null;
    this._flatpickr = null;
    this._isDateShowing = !!task.dueDate;
    this._color = task.color;
    this._repeatingDays = Object.assign({}, task.repeatingDays);
    this._isRepeatingTask = isRepeating(this._repeatingDays);
    this._description = task.description;
    this._dueDate = task.dueDate;
    this._subscribeOnEvents();
    this._applyFlatpickr();
    this._isDisabledSaveButton = this._isDisabledSaveButton.bind(this);
  }

  getTemplate() {
    return this._getCardTaskEditTemplate();
  }

  getData() {
    const formData = {
      description: encode(this._description),
      color: this._color,
      dueDate: this._dueDate,
      repeatingDays: Object.assign({}, this._repeatingDays),
    };

    return formData;
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonHandler(this._deleteButtonHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    super.removeElement();
  }

  setSubmitHandler(cb) {
    this.getElement().querySelector(`.card__save`).addEventListener(`click`, cb);

    this._submitHandler = cb;
  }

  setDeleteButtonHandler(cb) {
    this.getElement().querySelector(`.card__delete`).addEventListener(`click`, cb);
    this._deleteButtonHandler = cb;
  }

  _getCardTaskEditTemplate() {
    const formatDate = {
      day: `numeric`,
      month: `long`,
    };

    const formatTime = {
      hour: `numeric`,
      minute: `numeric`,
    };

    const date = this._isDateShowing ? `${this._dueDate.toLocaleString(`en-GB`, formatDate)}` : ``;
    const time = this._isDateShowing ? `${this._dueDate.toLocaleString(`en-GB`, formatTime)}` : ``;

    const repeatClass = this._isRepeatingTask ? `card--repeat` : ``;
    const deadlineClass = isOverdue(this._dueDate) ? `card--deadline` : ``;

    const colorsMarkup = createColorMarkup(COLORS, this._color);
    const repeatingDaysMarkup = createRepeatingDaysMarkup(DAYS, this._repeatingDays);

    return (
      `<article class="card card--edit card--${this._color} ${repeatClass} ${deadlineClass}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>
  
            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._description}</textarea>
              </label>
            </div>
  
            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${this._isDateShowing ? `yes` : `no`}</span>
                  </button>
                  ${
      this._isDateShowing ?
        `<fieldset class="card__date-deadline">
          <label class="card__input-deadline-wrap">
            <input
              class="card__date"
              type="text"
              placeholder=""
              name="date"
              value="${date} ${time}"
            />
          </label>
        </fieldset>`
        : ``
      }
                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${this._isRepeatingTask ? `yes` : `no`}</span>
                  </button>
  
                  ${
      this._isRepeatingTask ?
        `<fieldset class="card__repeat-days">
              <div class="card__repeat-days-inner">
                ${repeatingDaysMarkup}
              </div>
            </fieldset>`
        : ``
      }
                </div>
              </div>
              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${colorsMarkup}
                </div>
                </div>
              </div>
            <div class="card__status-btns">
              <button 
                class="card__save" 
                type="submit"
                ${this._isDisabledSaveButton() ? `disabled` : ``}
              >
                save
              </button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`
    );
  }

  _subscribeOnEvents() {
    this._onDateChange();
    this._onRepeatingDaysChange();
    this._onRepeatButtonClick();
    this._onDateButtonClick();
    this._onColorChange();
    this._onDescriptionChange();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._isDateShowing) {
      const taskEditEl = this.getElement();
      const dateInputEl = taskEditEl.querySelector(`.card__date`);

      this._flatpickr = flatpickr(dateInputEl, {
        altInput: true,
        allowInput: true,
        defaultDate: this._task.dueDate || `today`,
      });
    }
  }

  _isDisabledSaveButton() {
    const isSuccessDescriptionLength = this._description.length >= MIN_DESCRIPTION_LENGTH && this._description.length <= MAX_DESCRIPTION_LENGTH;
    const isSuccessDateOrRepeatingTask = this._isDateShowing || isRepeating(this._repeatingDays);
    if (isSuccessDescriptionLength && isSuccessDateOrRepeatingTask) {
      return false;
    }

    return true;
  }

  _onRepeatButtonClick() {
    const repeatButtonEl = this.getElement().querySelector(`.card__repeat-toggle`);
    repeatButtonEl.addEventListener(`click`, () => {
      this._isRepeatingTask = !this._isRepeatingTask;

      if (this._isRepeatingTask) {
        this._isDateShowing = false;
      }
      this._resetRepeatingDays();
      this.rerender();
    });
  }

  _onDateButtonClick() {
    const dateButtonEl = this.getElement().querySelector(`.card__date-deadline-toggle`);
    dateButtonEl.addEventListener(`click`, () => {
      this._isDateShowing = !this._isDateShowing;
      if (!this._dueDate && this._isDateShowing) {
        this._dueDate = new Date();
      }
      if (this._isDateShowing) {
        this._isRepeatingTask = false;
      } else {
        this._dueDate = null;
      }

      this._resetRepeatingDays();
      this._isDisabledSaveButton();
      this.rerender();
    });
  }

  _onColorChange() {
    const colorButtonsEl = this.getElement().querySelector(`.card__colors-inner`);
    colorButtonsEl.addEventListener(`change`, (evt) => {
      this._color = evt.target.value;
      this.rerender();
    });
  }

  _onDescriptionChange() {
    const descriptionInputEl = this.getElement().querySelector(`.card__text`);
    descriptionInputEl.addEventListener(`change`, (evt) => {
      this._description = evt.target.value;
      this.rerender();
    });
  }

  _onRepeatingDaysChange() {
    const repeatingDaysEl = this.getElement().querySelector(`.card__repeat-days`);
    if (repeatingDaysEl) {
      repeatingDaysEl.addEventListener(`change`, (evt) => {
        const targetDay = evt.target.value;
        this._repeatingDays[targetDay] = !this._task.repeatingDays[targetDay];
        this.rerender();
      });
    }
  }

  _onDateChange() {
    const dateInputEl = this.getElement().querySelector(`.card__input-deadline-wrap`);
    if (dateInputEl) {
      dateInputEl.addEventListener(`change`, (evt) => {
        this._dueDate = new Date(evt.target.value);
        this.rerender();
      });
    }
  }

  _resetRepeatingDays() {
    if (!this._isRepeatingTask) {
      Object.keys(this._repeatingDays).forEach((key) => {
        this._repeatingDays[key] = false;
      });
    }
  }
}

export default CardTaskEdit;
