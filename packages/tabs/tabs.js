import TabBar from "./TabBar.vue";
import TabScroller from "./TabScroller.vue";

export default {
  functional: true,
  props: {
    scroller: Boolean
  },
  render(h, ctx) {
    let tag = ctx.props.scroller ? TabScroller : TabBar;
    return h(tag, ctx.data, ctx.children);
  }
};