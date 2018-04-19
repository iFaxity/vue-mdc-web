<template lang="pug">
i.mdc-icon-toggle.material-icons(role="button", tabindex="0")
</template>

<script>
import Foundation from "@material/icon-toggle/foundation";
import { Ripple } from "../ripple";

const rippleAdapter = {
  isSurfaceActive() {
    return this.foundation.isKeyboardActivated();
  }
};

export default {
  name: "MDCIconToggle",
  mixins: [ Ripple(rippleAdapter, { unbounded: true }) ],
  props: {
    active: Boolean,
    disabled: Boolean,
    on: {
      type: Object,
      required: true
    },
    off: {
      type: Object,
      required: true
    }
  },
  model: {
    prop: "active",
    event: "change"
  },
  watch: {
    active(value) {
      this.foundation.toggle(this.active);
    },
    disabled(value) {
      this.foundation.setDisabled(this.disabled);
    },
    on(value) {
      this.foundation.toggleOnData_ = this.on;
    },
    off(value) {
      this.foundation.toggleOffData_ = this.off;
    }
  },
  mounted() {
    const { $el } = this;
    const findIcon = () => {
      const selector = $el.dataset.iconInnerSelector;
      return selector ? $el.querySelector(selector) : $el; 
    };

    this.foundation = new Foundation({
      addClass: className => findIcon().classList.add(className),
      removeClass: className => findIcon().classList.remove(className),
      registerInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      setText: text => findIcon().textContent = text,
      getTabIndex: () => $el.tabIndex,
      setTabIndex: tabIndex => $el.tabIndex = tabIndex,
      getAttr: (name, value) => $el.getAttribute(name, value),
      setAttr: (name, value) => $el.setAttribute(name, value),
      rmAttr: name => $el.removeAttribute(name),
      notifyChange: data => this.$emit("change", data),
    });
    this.foundation.init();

    // Set data here instead of using the data attributes
    this.foundation.toggleOnData_ = this.on;
    this.foundation.toggleOffData_ = this.off;
    // Sync with dom here
    this.foundation.toggle(this.active);
    this.foundation.setDisabled(this.disabled);
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};
</script>