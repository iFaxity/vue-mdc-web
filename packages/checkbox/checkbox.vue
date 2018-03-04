<template lang="pug">
.mdc-checkbox
  input.mdc-checkbox__native-control(ref="input", v-bind="$attrs", v-model="model", type="checkbox")
  .mdc-checkbox__background
    svg.mdc-checkbox__checkmark(viewBox="0 0 24 24")
      path.mdc-checkbox__checkmark-path(fill="none", stroke="white", d="M1.73,12.91 8.1,19.28 22.79,4.59")
    .mdc-checkbox__mixedmark
</template>

<script>
import Foundation from "@material/checkbox/foundation";
import { getCorrectEventName } from "@material/animation";
import { Ripple } from "../ripple";

const animationEnd = getCorrectEventName(window, "animationend");
const rippleAdapter = {
  registerInteractionHandler(typeName, handler) {
    this.$refs.input.addEventListener(typeName, handler);
  },
  deregisterInteractionHandler(typeName, handler) {
    this.$refs.input.removeEventListener(typeName, handler);
  }
};

export default {
  name: "MdcCheckbox",
  mixins: [ Ripple(rippleAdapter, { unbounded: true }) ],
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    disabled: Boolean,
    checked: Boolean,
    indeterminate: Boolean,
  },
  watch: {
    disabled(value) {
      this.foundation.setDisabled(value);
    },
    indeterminate(value) {
      this.foundation.setIndeterminate(value);
    }
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(value) {
        this.$emit("change", value);
      }
    }
  },

  mounted() {
    const { $el } = this;
    const { input } = this.$refs;

    // Initialize the foundation
    this.foundation = new Foundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      registerAnimationEndHandler: handler => $el.removeEventListener(animationEnd, handler),
      deregisterAnimationEndHandler: handler => $el.removeEventListener(animationEnd, handler),
      registerChangeHandler: handler => input.addEventListener("change", handler),
      deregisterChangeHandler: handler => input.removeEventListener("change", handler),
      getNativeControl: () => input,
      forceLayout: () => this.$forceUpdate(),
      isAttachedToDOM: () => !!$el.parentNode
    });
    this.foundation.init();
    this.foundation.setChecked(this.checked);
    this.foundation.setDisabled(this.disabled);
    this.foundation.setIndeterminate(this.indeterminate);
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};
</script>