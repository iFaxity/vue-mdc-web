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
import TextfieldMixin from "./mixin";
import MdcIcon from "../icon";

function uuid() {
  return '_mdtf_' + Math.random().toString(36).substr(2);
}

export default {
  name: 'MDCTextfield',
  mixins: [ TextfieldMixin ],
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
        'mdc-text-field--box': this.box,
        'mdc-text-field--outlined': this.outlined,
        'mdc-text-field--fullwidth': this.fullwidth,
        'mdc-text-field--dense': this.dense,
        'mdc-text-field--with-leading-icon': this.leadingIcon,
        'mdc-text-field--with-trailing-icon': !this.leadingIcon && this.trailingIcon
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
        this.$emit('input', value);
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
  }
};
</script>