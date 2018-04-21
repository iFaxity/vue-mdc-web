import MDCCheckbox from "./Checkbox.vue";
import "@material/checkbox/mdc-checkbox.scss";

export { MDCCheckbox };
export function install(Vue, register) {
  register(MDCCheckbox);
}
