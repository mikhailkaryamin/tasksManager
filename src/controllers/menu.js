import MenuComponent from '../components/menu.js';
import {render} from '../utils/render.js';

class MenuController {
  constructor(container, onPressButtonMenu) {
    this._container = container;

    this._onPressButtonMenu = onPressButtonMenu;
    this._menuComponent = null;
  }

  render() {
    const container = this._container;
    this._menuComponent = new MenuComponent();

    render(container, this._menuComponent);
    this._menuComponent.setMenuClickHandler(this._onPressButtonMenu);
  }

  // _onAddTaskButton() {
  //   this._boardController.addNewTask();
  // }
}

export default MenuController;
