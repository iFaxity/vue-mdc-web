const DIVIDER_CLASS = "mdc-list-divider";

export default {
  name: "MdcListGroup",
  render(h) {
    const $children = this.$slots.default;
    $children.forEach(({ data }) => {
      const classes = data.staticClass.split(" ");

      if(classes.includes(DIVIDER_CLASS)) {
        child.props.hr = true;
      }
    });

    return h("div", {staticClass: "mdc-list-group"}, $children);
  }
};