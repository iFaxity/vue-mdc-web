<template lang="pug">
header.mdc-toolbar(:class=`cssClasses`)
  slot
</template>

<script>
import Foundation from "@material/toolbar/foundation";
import { applyPassive } from "@material/toolbar/util";

export default {
  name: "MdcToolbar",
  props: {
    flexible: Boolean,
    waterfall: Boolean,
    fixed: {
      type: String,
      validator: value => value === "" || value === "lastrow"
    }
  },
  data() {
    return { fixedAdjustElement: null };
  },
  watch: {
    fixed(value) {
      const isStr = typeof value === "string";

      this.foundation.fixed_ = isStr;
      this.foundation.fixedLastrow_ = isStr && value === "lastrow";
    },
    flexible(value) {
      this.foundation.hasFlexibleRow_ = value;
      this.foundation.useFlexDefaultBehaviour_ = value;
    }
  },
  computed: {
    cssClasses() {
      //TODO: minimize flexible and fixed to a string
      return {
        "mdc-toolbar--waterfall": this.waterfall,
        "mdc-toolbar--fixed": typeof this.fixed === "string",
        "mdc-toolbar--fixed-lastrow-only": this.fixed === "lastrow",
        "mdc-toolbar--flexible": this.flexible,
        "mdc-toolbar--flexible-default-behavior": this.flexible
      };
    }
  },
  mounted() {
    const { $el } = this;
    const $title = () => $el.querySelector(".mdc-toolbar__title");
    const $row = () => $el.querySelector(".mdc-toolbar__row:first-child");
    const $fixedAdjust = (typeof this.fixed === "string" && $el.nextElementSibling) || null;

    this.foundation = new Foundation({
      hasClass: className => $el.classList.contains(className),
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      registerScrollHandler: handler => window.addEventListener("scroll", handler, applyPassive()),
      deregisterScrollHandler: handler => window.removeEventListener("scroll", handler, applyPassive()),
      registerResizeHandler: handler => window.addEventListener("resize", handler),
      deregisterResizeHandler: handler => window.removeEventListener("resize", handler),
      getViewportWidth: () => window.innerWidth,
      getViewportScrollY: () => window.pageYOffset,
      getOffsetHeight: () => $el.offsetHeight,
      getFirstRowElementOffsetHeight: () => $row().offsetHeight,
      notifyChange: data => this.$emit("change", data),
      setStyle: (prop, value) => $el.style.setProperty(prop, value),
      setStyleForTitleElement: (prop, value) => $title().style.setProperty(prop, value),
      setStyleForFlexibleRowElement: (prop, value) => $row().style.setProperty(prop, value),
      setStyleForFixedAdjustElement: (prop, value) => {
        if ($fixedAdjust) {
          $fixedAdjust.style.setProperty(prop, value);
        }
      }
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};
</script>