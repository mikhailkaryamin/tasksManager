import {NodePosition} from './const.js';
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, template, position = NodePosition.APPEND) => {
  switch (position) {
    case NodePosition.APPEND:
      container.append(template);
      break;
    case NodePosition.PREPEND:
      container.prepend(template);
      break;
  }
};

const onEscKeyDown = (evt, action) => {
  const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

  if (isEscKey) {
    action();
    document.removeEventListener(`keydown`, onEscKeyDown);
  }
};

export {
  formatTime,
  getRandomArrayItem,
  getRandomDate,
  createElement,
  render,
  onEscKeyDown,
};
