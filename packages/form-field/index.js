import FormField from "./FormField.vue";
import "@material/form-field/mdc-form-field.scss";

export { FormField };
export function install(Vue) {
  Vue.component(FormField.name, FormField);
}