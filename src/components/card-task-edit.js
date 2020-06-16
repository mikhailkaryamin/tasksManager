import AbstractSmartComponent from "./abstract-smart-component.js";
import {
  MONTH_NAMES,
  DAYS,
  COLORS,
} from "../const.js";

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
    this._repeatingDays = this._task.repeatingDays;
    this._isRepeatingTask = Object.values(this._repeatingDays).some(Boolean);
    this._color = this._task.color;
    this._isDateShowing = !!this._task.dueDate;
    this._subscribeOnEvents();
  }

  getTemplate() {
    return this._getCardTaskEditTemplate();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setSubmitHandler(cb) {
    this.getElement().querySelector(`.card__save`).addEventListener(`click`, cb);

    this._submitHandler = cb;
  }

  _getCardTaskEditTemplate() {
    const {
      description,
      dueDate,
    } = this._task;

    const isExpired = dueDate instanceof Date && dueDate < Date.now();

    const formatDate = {
      day: `numeric`,
      month: `long`,
    };

    const formatTime = {
      hour: `numeric`,
      minute: `numeric`,
    };

    const date = this._isDateShowing ? `${dueDate.toLocaleString(`en-GB`, formatDate)}` : ``;
    const time = this._isDateShowing ? `${dueDate.toLocaleString(`en-GB`, formatTime)}` : ``;

    const repeatClass = this._isRepeatingTask ? `card--repeat` : ``;
    const deadlineClass = isExpired ? `card--deadline` : ``;

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
                >${description}</textarea>
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
    const taskEditEl = this.getElement();
    const repeatButtonEl = taskEditEl.querySelector(`.card__repeat-toggle`);
    const dateButtonEl = taskEditEl.querySelector(`.card__date-deadline-toggle`);
    const colorButtonsEl = taskEditEl.querySelector(`.card__colors-inner`);

    repeatButtonEl.addEventListener(`click`, () => {
      this._isRepeatingTask = !this._isRepeatingTask;
      this.rerender();
    });

    dateButtonEl.addEventListener(`click`, () => {
      this._isDateShowing = !this._isDateShowing;

      this.rerender();
    });

    colorButtonsEl.addEventListener(`change`, (evt) => {
      this._color = evt.target.value;
      this.rerender();
    });
  }
}

export default CardTaskEdit;
