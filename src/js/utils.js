export const getRandom = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

export const hasValueObj = (obj, value) => Object.values(obj).some((el) => el === value);

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (elContainer, element) => {
  elContainer.append(element);
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export const isEscKeyDown = (evt, action) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    action();
  }
};
