<template lang="pug">
header.mdc-toolbar(:class="cssClasses")
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
    fixed: Boolean,
    fixedLastrow: Boolean
  },
  watch: {
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
        "mdc-toolbar--fixed": this.isFixed,
        "mdc-toolbar--fixed-lastrow-only": this.fixedLastrow,
        "mdc-toolbar--flexible": this.flexible,
        "mdc-toolbar--flexible-default-behavior": this.flexible
      };
    },
    isFixed() {
      if(this.foundation) {
        this.foundation.fixed_ = this.fixed;
        this.foundation.fixedLastrow_ = this.fixedLastrow;
      }

      return this.fixed || this.fixedLastrow;
    }
  },
  mounted() {
    const { $el } = this;
    const findTitle = () => $el.querySelector(".mdc-toolbar__title");
    const findRow = () => $el.querySelector(".mdc-toolbar__row:first-child");

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
      getFirstRowElementOffsetHeight: () => findRow().offsetHeight,
      notifyChange: data => this.$emit("change", data),
      setStyle: (prop, value) => $el.style.setProperty(prop, value),
      setStyleForTitleElement: (prop, value) => findTitle().style.setProperty(prop, value),
      setStyleForFlexibleRowElement: (prop, value) => findRow().style.setProperty(prop, value),
      setStyleForFixedAdjustElement: (prop, value) => {
        const $fixedAdjust = this.isFixed && $el.nextElementSibling;
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