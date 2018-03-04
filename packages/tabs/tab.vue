<template lang="pug">
mdc-link.mdc-tab(v-bind="$_link", role="tab", :link="link")
  template(v-if="icon")
    mdc-icon(name="tab", :icon="icon")
    span.mdc-tab__icon-text(v-if="text") {{ text }}
  template(v-else) {{ text }}
</template>

<script>
import Foundation from "@material/tabs/tab/foundation";
import { Ripple } from "../ripple";
import RouterLink from "../app/routerLink";
import MdcIcon from "../icon";

export default {
  name: "MdcTab",
  mixins: [ Ripple(), RouterLink("mdc-tab--active") ],
  components: { MdcIcon },
  props: {
    link: String,
    icon: String,
    text: String
  },

  mounted() {
    const { $el } = this;

    this.foundation = new Foundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      getOffsetWidth: () => $el.offsetWidth,
      getOffsetLeft: () => $el.offsetLeft,
      notifySelected: () => this.$parent.$emit("selected", this),
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    computedWidth() {
      return this.foundation.getComputedWidth();
    },
    computedLeft() {
      return this.foundation.getComputedLeft();
    },
    setActive(value) {
      this.foundation.setActive(value);
    },
    isActive() {
      return this.foundation.isActive();
    },
    preventsDefaultOnClick() {
      return this.foundation.preventsDefaultOnClick();
    },
    preventDefaultOnClick(preventDefaultOnClick) {
      this.foundation.setPreventDefaultOnClick(preventDefaultOnClick);
    },
    measureSelf() {
      this.foundation.measureSelf();
    }
  }
};
</script>