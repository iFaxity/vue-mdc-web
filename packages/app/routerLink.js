const MdcLink = {
  functional: true,
  props: {
    tag: {
      type: String,
      default: "a"
    },
    link: String,
    to: String,
    replace: Boolean,
    append: Boolean,
    exact: Boolean
  },
  render(h, ctx) {
    const { data, props } = ctx;
    let tag = props.tag;

    if(props.to) {
      tag = "router-link";
      // remove the link
      data.props = Object.assign({}, props, { link: undefined });
    } else {
      if(tag === "a") {
        data.attrs.href = props.link;
      }
    }

    return h(tag, data, ctx.children);
  }
};

export default function install(activeClass, exactActiveClass) {
  return {
    components: { MdcLink: MdcLink },
    props: {
      to: String,
      replace: Boolean,
      append: Boolean,
      exact: Boolean
    },
    computed: {
      $_link() {
        return this.to && {
          activeClass, exactActiveClass,
          to: this.to,
          replace: this.replace,
          append: this.append,
          exact: this.exact
        };
      }
    }
  };
}