const TYPES = ["temporary", "permanent", "persistent"];

export default {
  name: "MdcDrawer",
  functional: true,
  inheritAttrs: true,

  props: {
    type: {
      type: String,
      validator: value => TYPES.includes(value)
    },
    temporary: Boolean,
    permanent: Boolean,
    persistent: Boolean
  },

  render(h, ctx) {
    const { props } = ctx;
    let type = props.type || TYPES.find(n => props[n] === true);

    if(!TYPES.includes(type)) {
      throw new Error("MDC Drawer: a valid type was not specified");
    }
    return h(`mdc-${type}-drawer`, ctx.data, ctx.children)
  }
}