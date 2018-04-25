import MDCSwitch from './Switch.vue';
import '@material/switch/mdc-switch.scss';

export { MDCSwitch };
export function install(Vue, register) {
  register(MDCSwitch);
}