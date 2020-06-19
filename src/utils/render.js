import {NodePosition} from '../const.js';

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, component, position = NodePosition.APPEND) => {
  switch (position) {
    case NodePosition.APPEND:
      container.append(component.getElement());
      break;
    case NodePosition.PREPEND:
      container.prepend(component.getElement());
      break;
  }
};

const removeElement = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const replaceElement = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }

};

export {
  createElement,
  render,
  removeElement,
  replaceElement,
};

