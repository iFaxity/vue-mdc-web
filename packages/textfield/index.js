import Textfield from "./textfield";
import TextfieldHelpertext from "./TextfieldHelpertext.vue";
import "@material/textfield/mdc-text-field.scss";

export { Textfield, TextfieldHelpertext };
export function install(Vue) {
  Vue.component("mdc-textfield", Textfield);
  Vue.component(TextfieldHelpertext.name, TextfieldHelpertext);
}