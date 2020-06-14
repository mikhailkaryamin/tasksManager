import AbstractComponent from './abstract-component.js';

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">
      load more
    </button>`
  );
};

class LoadMoreButton extends AbstractComponent {
  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setLoadMoreButtonHandler(cb) {
    this.getElement().addEventListener(`click`, cb);
  }
}
export default LoadMoreButton;
