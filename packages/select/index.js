import Select from "./Select.vue";
import SelectItem from "./SelectItem.vue";
import "@material/select/mdc-select.scss";

export { Select, SelectItem };
export function install(Vue) {
  Vue.component(Select.name, Select);
  Vue.component(SelectItem.name, SelectItem);
}