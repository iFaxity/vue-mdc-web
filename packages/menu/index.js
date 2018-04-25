import MDCMenu from './Menu.vue';
import MDCMenuItem from './MenuItem.vue';
import '@material/menu/mdc-menu.scss';

export { MDCMenu, MDCMenuItem };
export function install(Vue, register) {
  register(MDCMenu, MDCMenuItem);
}