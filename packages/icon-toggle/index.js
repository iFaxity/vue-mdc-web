import MDCIconToggle from './IconToggle.vue';
import '@material/icon-toggle/mdc-icon-toggle.scss';

export { MDCIconToggle };
export function install(Vue, register) {
  register(MDCIconToggle);
}