<template lang="pug">
.mdc-text-field(:class="cssClasses")
  // Leading Icon
  mdc-icon(v-if="leadingIcon", ref="icon", name="text-field", :icon="leadingIcon")
  //i.material-icons.mdc-text-field__icon(v-if="leadingIcon", ref="icon") {{ leadingIcon }}

  input.mdc-text-field__input(ref="input", v-bind="$attrs", v-model="model", :placeholder="fullwidth && label")
  label.mdc-text-field__label(v-if="!fullwidth", ref="label") {{ label }}
    
  // Trailing Icon
  mdc-icon(v-if="!leadingIcon && trailingIcon", ref="icon", name="text-field", :icon="trailingIcon")
  //i.material-icons.mdc-text-field__icon(v-if="!leadingIcon && trailingIcon", ref="icon") {{ trailingIcon }}
    
  .mdc-line-ripple(v-if="!outlined", ref="lineRipple")
  template(v-else)
    .mdc-text-field__outline(ref="outline")
      svg
        path.mdc-text-field__outline-path(ref="outlinePath")
    .mdc-text-field__idle-outline(ref="idleOutline")
</template>

<script>
import Foundation from "@material/textfield/foundation";
import { Ripple, matches } from "../ripple";
import { lineRippleFactory, helperTextFactory, iconFactory, labelFactory, outlineFactory } from "./foundations";
import MdcIcon from "../icon";

const rippleAdapter = {
  isSurfaceActive() {
    return this.$refs.input[matches]("active");
  },
  registerInteractionHandler(type, handler) {
    this.$refs.input.addEventListener(type, handler);
  },
  deregisterInteractionHandler(type, handler) {
    this.$refs.input.removeEventListener(type, handler);
  }
};

function getHelperText(helperText) {
  return helperText.classList.contains("mdc-text-field-helper-text") ? helperText : null;
}

export default {
  name: "MdcTextfield",
  inheritAttrs: false,
  mixins: [ Ripple(rippleAdapter) ],
  components: { MdcIcon },
  props: {
    box: Boolean,
    outlined: Boolean,
    fullwidth: Boolean,
    disabled: Boolean,
    dense: Boolean,
    required: Boolean,
    // For v-model
    value: String,
    label: String,

    // Icon definitions
    trailingIcon: String,
    leadingIcon: String
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
    }
  },

  mounted() {
    const { $el } = this;
    const { input } = this.$refs;

    const styles = getComputedStyle($el);
    const foundationMap = this.$_getFoundationMap();
    const { lineRipple } = foundationMap;

    if(!this.box || !this.outlined) {
      this._ripple.destroy();
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
      
      getNativeInput: () => input,
      isFocused: () => document.activeElement === input,
      isRtl: () => styles.direction === "rtl",
      activateLineRipple: () => lineRipple && lineRipple.activate(),
      deactivateLineRipple: () => lineRipple && lineRipple.deactivate(),
      setLineRippleTransformOrigin: normalizedX => lineRipple && lineRipple.setRippleCenter(normalizedX),
    }, foundationMap);

    // Initialize line ripple before foundation
    lineRipple && lineRipple.init();
    this.foundation.init();
    this.foundation.setDisabled(this.disabled);
    this.foundation.setRequired(this.required);
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    $_getFoundationMap() {
      const { lineRipple, icon, label, outline, outlinePath, idleOutline } = this.$refs;
      let helperText = getHelperText(this.$el.nextElementSibling);

      return {
        lineRipple: lineRipple && lineRippleFactory(lineRipple),
        helperText: helperText && helperTextFactory(helperText),
        icon: icon && this.hasIconListener && iconFactory(icon.$el, () => this.$emit("icon")),
        label: label && labelFactory(label),
        outline: outline && outlineFactory(outline, outlinePath, idleOutline),
      };
    }
  }
};
</script>