import { default as MDCTextfield } from "./textfield.vue";
import { default as MDCTextarea } from "./textarea.vue";
import { default as MDCTextfieldHelptext } from "./textfield-helptext.vue";
export { MDCTextfield, MDCTextarea, MDCTextfieldHelptext };

export default {
  install(Vue) {
    Vue.component(MDCTextfield.name, MDCTextfield);
    Vue.component(MDCTextarea.name, MDCTextarea);
    Vue.component(MDCTextfieldHelptext.name, TextfieldHelptext);
  }
};