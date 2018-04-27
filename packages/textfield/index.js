import MDCTextfield from './Textfield.vue';
import MDCTextarea from './Textarea.vue';
import MDCTextfieldHelpertext from './TextfieldHelpertext.vue';
import '@material/textfield/mdc-text-field.scss';

// Used to easily separate the textarea and textfield components
const MDCTextfieldProxy = {
  functional: true,
  props: {
    textarea: Boolean
  },
  render(h, ctx) {
    const tag = ctx.props.textarea ? MDCTextarea : MDCTextfield;
    return h(tag, ctx.data, ctx.children);
  }
};

export { MDCTextfieldProxy as MDCTextfield, MDCTextfieldHelpertext };
export function install(Vue, register) {
  register(MDCTextfieldHelpertext);
  // Register proxy component seperately
  Vue.component('mdc-textfield', MDCTextfieldProxy);
}
