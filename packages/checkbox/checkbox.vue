<template lang="pug">
.mdc-checkbox
  input.mdc-checkbox__native-control(ref="input", type="checkbox", v-bind="$attrs", :disabled="disabled", v-model="model")
  .mdc-checkbox__background
    svg.mdc-checkbox__checkmark(viewBox="0 0 24 24")
      path.mdc-checkbox__checkmark__path(fill="none", stroke="white", d="M1.73,12.91 8.1,19.28 22.79,4.59")
    .mdc-checkbox__mixedmark
</template>

<script>
import Foundation from "@material/checkbox/foundation";
import { getCorrectEventName } from "@material/animation";
import { Ripple } from "../ripple";

const animationEnd = getCorrectEventName(window, "animationend");
const rippleAdapter = {
  registerInteractionHandler(typeName, handler) {
    const { input } = this.$refs;
    input.addEventListener(typeName, handler);
  },
  deregisterInteractionHandler(typeName, handler) {
    const { input } = this.$refs;
    input.removeEventListener(typeName, handler);
  },
  computeBoundingRect() {
    const { left, top } = this.$el.getBoundingClientRect();
    const DIM = 40;
    return {
      top, left,
      right: left + DIM,
      bottom: top + DIM,
      width: DIM,
      height: DIM,
    };
  }
};

export default {
  name: "MdcCheckbox",
  inheritAttrs: false,
  mixins: [ Ripple(rippleAdapter, { unbounded: true }) ],
  props: {
    disabled: Boolean,
    checked: Boolean,
    indeterminate: Boolean,
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
  },
  model: {
    prop: "checked",
    event: "change"
  },
  watch: {
    disabled(value) {
      this.foundation.setDisabled(value);
    },
    checked(value) {
      this.foundation.setChecked(value);
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
  }
};
</script>