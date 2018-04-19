import Menu from "./Menu.vue";
import MenuItem from "./MenuItem.vue";
import "@material/menu/mdc-menu.scss";

export { Menu, MenuItem };
export function install(Vue, register) {
  register(Menu, MenuItem);
}