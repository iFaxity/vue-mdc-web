import Textfield from "./textfield";
import TextfieldHelpertext from "./TextfieldHelpertext.vue";
import "@material/textfield/mdc-text-field.scss";

export { Textfield, TextfieldHelpertext };
export function install(Vue, register) {
  register(TextFieldHelpertext);
  // Register Textfield like this for now
  Vue.component("mdc-textfield", Textfield);
}