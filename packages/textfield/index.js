import MDCTextfield from "./textfield";
import MDCTextfieldHelpertext from "./TextfieldHelpertext.vue";
import "@material/textfield/mdc-text-field.scss";

export { MDCTextfield, MDCTextfieldHelpertext };
export function install(Vue, register) {
  register(MDCTextfieldHelpertext);
  // Register Textfield like this for now
  Vue.component("mdc-textfield", MDCTextfield);
}