import MDCButton from './Button.vue';
import '@material/button/mdc-button.scss';

export { MDCButton };
export function install(Vue, register) {
  register(MDCButton);
}