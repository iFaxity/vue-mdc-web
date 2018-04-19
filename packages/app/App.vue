<template lang="pug">
.mdc-app.mdc-typography(:class="cssClasses")
  slot(:name="headerSlot")

  .mdc-app__content(:class="contentCssClasses")
    slot(:name="contentSlot")
    slot
</template>

<script>
import "./app.scss";

export default {
  name: "MDCApp",
  props: {
    flip: Boolean, // flips the drawer & toolbar slot
    drawerHideMobile: Boolean,
    alignStart: Boolean
  },
  computed: {
    headerSlot() {
      return this.flip ? "drawer" : "toolbar";
    },
    contentSlot() {
      return this.flip ? "toolbar" : "drawer";
    },
    cssClasses() {
      return {
        "mdc-app--flipped": this.flip,
        "mdc-app--align-start": this.alignStart,
        "mdc-app--drawer-hide-mobile": this.drawerHideMobile
      };
    },
    contentCssClasses() {
      return this.alignStart && "mdc-app__content--align-start";
    }
  },
  methods: {}
};
</script>