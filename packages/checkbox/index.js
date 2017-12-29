import { default as MDCCheckbox } from "./checkbox.vue";
import "@material/checkbox/mdc-checkbox.scss";

export { MDCCheckbox };
export function install(Vue) {
  Vue.component(MDCCheckbox.name, MDCCheckbox);
}
