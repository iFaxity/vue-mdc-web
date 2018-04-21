<template lang="pug">
.mdc-text-field(:class="cssClasses")
  // Leading Icon
  mdc-icon(v-if="leadingIcon", ref="icon", name="text-field", :icon="leadingIcon")

  input.mdc-text-field__input(ref="input", v-model="model", v-bind="inputAttrs")
  label.mdc-floating-label(v-if="!fullwidth", ref="label", :for="uuid") {{ label }}
    
  // Trailing Icon
  mdc-icon(v-if="!leadingIcon && trailingIcon", ref="icon", name="text-field", :icon="trailingIcon")
    
  .mdc-line-ripple(v-if="!outlined", ref="lineRipple")
  template(v-else)
    .mdc-text-field__outline(ref="outline")
      svg
        path.mdc-text-field__outline-path(ref="outlinePath")
    .mdc-text-field__idle-outline(ref="idleOutline")
</template>

<script>
import Foundation from "@material/textfield/foundation";
import { lineRippleFactory, helperTextFactory, iconFactory, labelFactory, outlineFactory } from "./foundations";
import MdcIcon from "../icon";

function getHelperText(helperText) {
  return helperText.classList.contains("mdc-text-field-helper-text") ? helperText : null;
}
function uuid() {
  return "_mdtf_" + Math.random().toString(36).substr(2);
}

export default {
  name: "MDCTextfield",
  components: { MdcIcon },
  props: {
    box: Boolean,
    outlined: Boolean,
    fullwidth: Boolean,
    dense: Boolean,
    required: Boolean,
    disabled: Boolean,

    id: String,
    type: String,
    value: String,
    label: String,

    // Validation
    pattern: String,
    min: Number,
    max: Number,
    step: Number,
    minlength: Number,
    maxlength: Number,

    // Icon definitions
    trailingIcon: String,
    leadingIcon: String
  },
  watch: {
    disabled(value) {
      this.foundation.setDisabled(value);
    }
  },
  computed: {
    cssClasses() {
      return {
        "mdc-text-field--box": this.box,
        "mdc-text-field--outlined": this.outlined,
        "mdc-text-field--fullwidth": this.fullwidth,
        "mdc-text-field--dense": this.dense,
        "mdc-text-field--with-leading-icon": this.leadingIcon,
        "mdc-text-field--with-trailing-icon": !this.leadingIcon && this.trailingIcon
      };
    },
    hasIconListener() {
      return !!(this.$listeners && this.$listeners.icon);
    },
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },
    inputAttrs() {
      const label = this.fullwidth && this.label;

      return {
        required: this.required,
        placeholder: label,
        ariaLabel: label,

        // Validation
        id: this.uuid,
        type: this.type,
        pattern: this.pattern,
        min: this.min,
        max: this.max,
        step: this.step,
        minlength: this.minlength,
        maxlength: this.maxlength,
      };
    }
  },
  data() {
    return { uuid: this.id || uuid()  };
  },

  mounted() {
    const { $el } = this;
    const { input } = this.$refs;

    const styles = getComputedStyle($el);
    this.foundationMap = this.$_getFoundationMap();

    if(this.$refs.lineRipple) {
      this._lineRipple = lineRippleFactory(this.$refs.lineRipple);
    }
    if(this.$refs.label) {
      this._label = labelFactory(this.$refs.label);
    }
    if(this.$refs.outline) {
      this._outline = outlineFactory(this.$refs.outline, this.$refs);
    }

    this.foundation = new Foundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      // Interactions
      registerTextFieldInteractionHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterTextFieldInteractionHandler: (type, handler) => $el.removeEventListener(type, handler),
      registerInputInteractionHandler: (type, handler) => input.addEventListener(type, handler),
      deregisterInputInteractionHandler: (type, handler) => input.removeEventListener(type, handler),
      registerValidationAttributeChangeHandler: handler => {
        const observer = new MutationObserver(handler);
        observer.observe(this.$refs.input, { attributes: true });
        return observer;
      },
      deregisterValidationAttributeChangeHandler: observer => observer.disconnect(),
      
      getNativeInput: () => input,
      isFocused: () => document.activeElement === input,
      isRtl: () => styles.direction === "rtl",

      // Line Ripple methods
      activateLineRipple: () => this._lineRipple && this._lineRipple.activate(),
      deactivateLineRipple: () => this._lineRipple && this._lineRipple.deactivate(),
      setLineRippleTransformOrigin: normalizedX => this._lineRipple && this._lineRipple.setRippleCenter(normalizedX),
      // Label methods
      shakeLabel: shouldShake => this._label.shake(shouldShake),
      floatLabel: shouldFloat => this._label.float(shouldFloat),
      hasLabel: () => !!this._label,
      getLabelWidth: () => this._label.getWidth(),
      // Outline methods
      hasOutline: () => !!this._outline,
      notchOutline: (labelWidth, isRtl) => this._outline.notch(labelWidth, isRtl),
      closeOutline: () => this._outline.closeNotch(),
    }, this.foundationMap);

    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
  },
  beforeDestroy() {
    this.foundation.destroy();

    if(this.foundationMap.helperText) {
      this.foundationMap.helperText.destroy();
    }
    if(this.foundationMap.icon) {
      this.foundationMap.icon.destroy();
    }
    if(this._lineRipple) {
      this._lineRipple.destroy();
    }
    if(this._label) {
      this._label.destroy();
    }
    if(this._outline) {
      this._outline.destroy();
    }
  },
  methods: {
    $_getFoundationMap() {
      const { icon } = this.$refs;
      const helperText = getHelperText(this.$el.nextElementSibling);

      return {
        helperText: helperText && helperTextFactory(helperText),
        icon: icon && this.hasIconListener && iconFactory(icon.$el, () => this.$emit("icon")),
      };
    }
  }
};
</script>