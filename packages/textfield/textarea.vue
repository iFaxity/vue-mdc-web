<template lang="pug">
.mdc-text-field.mdc-text-field--textarea(:class="cssClasses")
  textarea.mdc-text-field__input(ref="input", v-bind="$attrs", v-model="model", :label="fullwidth && label")
  label.mdc-floating-label(v-if="!fullwidth", ref="label") {{ label }}
</template>

<script>
import Foundation from "@material/textfield/foundation";
import { lineRippleFactory, helperTextFactory, iconFactory, labelFactory, outlineFactory } from "./foundations";

function getHelperText(helperText) {
  return helperText.classList.contains("mdc-text-field-helper-text") ? helperText : null;
}

export default {
  name: "MDCTextarea",
  inheritAttrs: false,
  props: {
    fullwidth: Boolean,
    disabled: Boolean,
    dense: Boolean,
    required: Boolean,
    // For v-model
    value: String,
    label: String
  },
  watch: {
    disabled(value) {
      this.foundation.setDisabled(value);
    },
    required(value) {
      this.foundation.setRequired(value);
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    cssClasses() {
      return {
        "mdc-text-field--fullwidth": this.fullwidth,
        "mdc-text-field--dense": this.dense
      };
    }
  },
  mounted() {
    const { $el } = this;
    const { input } = this.$refs;

    const styles = getComputedStyle($el);
    const foundationMap = this.$_getFoundationMap();

    this.foundation = new Foundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      // Interactions
      registerTextFieldInteractionHandler: (evtType, handler) => $el.addEventListener(evtType, handler),
      deregisterTextFieldInteractionHandler: (evtType, handler) => $el.removeEventListener(evtType, handler),
      registerInputInteractionHandler: (evtType, handler) => input.addEventListener(evtType, handler),
      deregisterInputInteractionHandler: (evtType, handler) => input.removeEventListener(evtType, handler),
      
      getNativeInput: () => input,
      isFocused: () => document.activeElement === input,
      isRtl: () => styles.direction === "rtl",

      activateLineRipple: () => {},
      deactivateLineRipple: () => {},
      setLineRippleTransformOrigin: () => {},
    }, foundationMap);

    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
    this.foundation.setRequired(this.required);
    this.foundation.setValue(this.value);
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    $_getFoundationMap(vm) {
      const { lineRipple, icon, label, outline, outlinePath, idleOutline } = this.$refs;
      let helperText = getHelperText(this.$el.nextElementSibling);

      return {
        lineRipple: lineRipple && lineRippleFactory(lineRipple),
        helperText: helperText && helperTextFactory(helperText),
        icon: icon && iconFactory(icon, () => this.$emit("icon")),
        label: label && labelFactory(label),
        outline: outline && outlineFactory(outline, outlinePath, idleOutline),
      };
    }
  }
};
</script>