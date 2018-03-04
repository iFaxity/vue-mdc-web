import Checkbox from "./Checkbox.vue";
import "@material/checkbox/mdc-checkbox.scss";

export { Checkbox };
export function install(Vue) {
  Vue.component(Checkbox.name, Checkbox);
}
