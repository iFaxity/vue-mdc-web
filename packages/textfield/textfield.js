import Textfield from "./Textfield.vue";
import Textarea from "./Textarea.vue";

export default {
  functional: true,
  props: {
    textarea: Boolean
  },
  render(h, ctx) {
    let tag = ctx.props.textarea ? Textarea : Textfield;
    return h(tag, ctx.data, ctx.children);
  }
};