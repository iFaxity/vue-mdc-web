import { default as MDCFormField } from "./form-field.vue";
export { MDCFormField };

export default {
  install(Vue) {
    Vue.component(MDCFormField.name, MDCFormField);
  }
};