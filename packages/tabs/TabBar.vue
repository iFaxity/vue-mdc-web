<template lang="pug">
nav.mdc-tab-bar(:class="cssClasses")
  slot
  span.mdc-tab-bar__indicator(ref="indicator", :style="getIndicatorStyle")
</template>

<script>
import Foundation from "@material/tabs/tab-bar/foundation";

export default {
  name: "MDCTabBar",
  props: {
    icons: Boolean,
    iconsWithText: Boolean,
    primary: Boolean,
    secondary: Boolean
  },
  data() {
    return { index: -1, tabs: [] };
  },
  computed: {
    cssClasses() {
      return {
        "mdc-tab-bar--upgraded": true,
        "mdc-tab-bar--icon-tab-bar": this.icons,
        "mdc-tab-bar--icons-with-text": this.iconsWithText
      };
    }
  },
  mounted() {
    const { $el } = this;
    const { indicator } = this.$refs;

    this.tabs = this.$children;

    this.foundation = new Foundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      bindOnMDCTabSelectedEvent: () => this.$on("selected", this.onSelected),
      unbindOnMDCTabSelectedEvent: () => this.$off("selected", this.onSelected),
      registerResizeHandler: handler => window.addEventListener("resize", handler),
      deregisterResizeHandler: handler => window.removeEventListener("resize", handler),
      getOffsetWidth: () => $el.offsetWidth,
      setStyleForIndicator: (prop, value) => {
        indicator.style[prop] = value;
      },
      getOffsetWidthForIndicator: () => indicator.offsetWidth,
      notifyChange: data => this.$emit("change", data),
      getNumberOfTabs: () => this.tabs.length,
      isTabActiveAtIndex: index => this.tabs[index].isActive(),
      setTabActiveAtIndex: (index, active) => this.tabs[index].setActive(active),
      isDefaultPreventedOnClickForTabAtIndex: index => this.tabs[index].preventsDefaultOnClick(),
      setPreventDefaultOnClickForTabAtIndex: (index, value) => this.tabs[index].preventDefaultOnClick(value),
      measureTabAtIndex: index => this.tabs[index].measureSelf(),
      getComputedWidthForTabAtIndex: index => this.tabs[index].computedWidth(),
      getComputedLeftForTabAtIndex: index => this.tabs[index].computedLeft(),
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    onSelected(tab) {
      const index = this.tabs.indexOf(tab);

      if(index < 0) {
        throw new Error("Invalid tab?");
      }
      this.foundation.switchToTabAtIndex(index, true);
    }
  }
};
</script>