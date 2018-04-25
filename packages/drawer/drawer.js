const TYPES = [ 'permanent', 'persistent', 'temporary' ];

export default {
  name: 'MDCDrawer',
  functional: true,
  inheritAttrs: true,

  props: {
    type: {
      type: String,
      default: 'permanent'
    },
    temporary: Boolean,
    permanent: Boolean,
    persistent: Boolean,
  },

  render(h, ctx) {
    const { props } = ctx;
    let type = props.type || TYPES.find(n => props[n] === true);

    if(!TYPES.includes(type)) {
      throw new Error('MDC Drawer: a valid type was not specified');
    }
    return h(`mdc-${type}-drawer`, ctx.data, ctx.children)
  }
}