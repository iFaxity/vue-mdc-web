import Menu from "./Menu.vue";
import MenuItem from "./MenuItem.vue";
import "@material/menu/mdc-menu.scss";

export { Menu, MenuItem };
export function install(Vue) {
  Vue.component(Menu.name, Menu);
  Vue.component(MenuItem.name, MenuItem);
}