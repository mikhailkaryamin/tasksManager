import MenuComponent from '../components/menu.js';
import {render} from '../utils/render.js';

class MenuController {
  constructor(container, boardController) {
    this._container = container;
    this._boardController = boardController;
    this._menuComponent = null;
    this._onAddTaskButton = this._onAddTaskButton.bind(this);
  }

  render() {
    const container = this._container;
    this._menuComponent = new MenuComponent();

    render(container, this._menuComponent);
    this._menuComponent.setAddButtonHandler(this._onAddTaskButton);
  }

  _onAddTaskButton() {
    this._boardController.addNewTask();
  }
}

export default MenuController;
