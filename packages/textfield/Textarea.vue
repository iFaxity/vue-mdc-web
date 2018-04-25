<template lang="pug">
.mdc-text-field.mdc-text-field--textarea(:class="cssClasses")
  textarea.mdc-text-field__input(ref="input", v-bind="$attrs", v-model="model", :label="fullwidth && label")
  label.mdc-floating-label(v-if="!fullwidth", ref="label") {{ label }}
</template>

<script>
import TextfieldMixin from "./mixin";

export default {
  name: 'MDCTextarea',
  mixins: [ TextfieldMixin ],
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
        this.$emit('input', value);
      }
    },
    cssClasses() {
      return {
        'mdc-text-field--fullwidth': this.fullwidth,
        'mdc-text-field--dense': this.dense
      };
    }
  }
};
</script>