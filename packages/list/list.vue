<template lang="pug">
component.mdc-list(:is=`nav ? "nav" : "ul"`)
  slot
</template>

<script>
const vRipple = {
  name: "ripple"
};

export default {
  name: "MdcList",
  props: {
    nav: Boolean,
    ripple: Boolean,

    dense: Boolean,
    avatar: Boolean,
    twoLine: Boolean,
  },
  computed: {
    cssClasses() {
      return {
        "mdc-list--dense": this.dense,
        "mdc-list--avatar-list": this.avatar,
        "mdc-list--two-line": this.twoLine
      };
    }
  },
  render(h) {
    const $children = this.$slots.default;
    $children.forEach(({ data, staticClass }) => {
      const classList = staticClass.split(" ");

      if(classList.includes("mdc-list-item")) {
        if(this.nav) {
          data.props.link = true;
        }
        if(this.ripple) {
          data.directives.push(vRipple);
        }
      } else if(this.nav && classList.includes("mdc-list-divider")) {
        data.props.hr = true;
      }
    });

    const tag = this.nav ? "nav" : "ul";
    return h(tag, { staticClass: "mdc-list", class: this.cssClasses } , $children);
  }
};
</script>


