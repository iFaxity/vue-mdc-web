import MDCFormField from "./FormField.vue";
import "@material/form-field/mdc-form-field.scss";

export { MDCFormField };
export function install(Vue, register) {
  register(MDCFormField);
}