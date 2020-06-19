import {EscKeyName} from '../const.js';

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

const onEscKeyDown = (evt, action) => {
  const isEscKey = evt.key === EscKeyName.FULL || evt.key === EscKeyName.CUT;

  if (isEscKey) {
    action();
  }
};

const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

const isToday = (date) => {

  if (date) {
    const currentDate = new Date().toDateString();
    return date.toDateString() === currentDate;
  }
  return false;
};

const isOverdue = (dueDate) => {
  if (dueDate) {
    return dueDate < Date.now() && !isToday(dueDate);
  }

  return false;
};

export {
  getRandomArrayItem,
  getRandomDate,
  isRepeating,
  isOverdue,
  isToday,
  onEscKeyDown,
};
