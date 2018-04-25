<template lang="pug">
.mdc-switch(:class="cssClasses")
  input.mdc-switch__native-control(type="checkbox", v-bind="$attrs", v-model="model", :disabled="disabled")
  .mdc-switch__background
    .mdc-switch__knob
</template>

<script>
export default {
  name: 'MDCSwitch',
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'change'
  },
  
  props: {
    disabled: Boolean,
    checked: [Boolean, Array]
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(value) {
        this.$emit('change', value);
      }
    },
    cssClasses() {
      return this.disabled && 'mdc-switch--disabled';
    }
  }
};
</script>