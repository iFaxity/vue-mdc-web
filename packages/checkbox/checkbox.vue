<template lang="pug">
.mdc-checkbox
  input.mdc-checkbox__native-control(ref="input", type="checkbox", v-bind="$attrs", :value="value", @change="onChange")
  .mdc-checkbox__background
    svg.mdc-checkbox__checkmark(viewBox="0 0 24 24")
      path.mdc-checkbox__checkmark-path(fill="none", stroke="white", d="M1.73,12.91 8.1,19.28 22.79,4.59")
    .mdc-checkbox__mixedmark
</template>

<script>
//, v-model="model"
import Foundation from "@material/checkbox/foundation";
import { getCorrectEventName } from "@material/animation";
import { Ripple, matches } from "../ripple";

const animationEnd = getCorrectEventName(window, "animationend");
const rippleAdapter = {
  isSurfaceActive() {
    return this.$refs.input[matches](":active");
  },
  registerInteractionHandler(typeName, handler) {
    this.$refs.input.addEventListener(typeName, handler);
  },
  deregisterInteractionHandler(typeName, handler) {
    this.$refs.input.removeEventListener(typeName, handler);
  }
};

export default {
  name: "MDCCheckbox",
  mixins: [ Ripple(rippleAdapter, { unbounded: true }) ],
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: [Boolean, Array],
    disabled: Boolean,
    indeterminate: Boolean,
    value: [String, Number, Boolean]
  },
  watch: {
    checked(value) {
      if(Array.isArray(value)) {
        value = value.includes(this.value);
      }
      this.foundation.setChecked(value);
    },
    disabled(value) {
      this.foundation.setDisabled(value);
    },
    indeterminate(value) {
      this.foundation.setIndeterminate(value);
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
    this.foundation.setDisabled(this.disabled);
    this.foundation.setIndeterminate(this.indeterminate);

    if(Array.isArray(this.checked)) {
      this.foundation.setChecked(this.checked.includes(this.value));
    } else {
      this.foundation.setChecked(this.checked);
    }
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    onChange(e) {
      let value = e.target.checked;
      this.$emit("update:indeterminate", this.foundation.isIndeterminate());

      if(Array.isArray(this.checked)) {
        const arr = this.checked;
        if(value) {
          arr.push(this.value);
        } else {
          const index = arr.indexOf(this.value);
          arr.splice(index, 1);
        }
        
        value = arr;
      } else if(this.value) {
        value = this.value;
      }

      this.$emit("change", value);
    }
  }
};
</script>