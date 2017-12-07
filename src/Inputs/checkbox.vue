<template lang="pug">
  .mdc-checkbox(:class=`cssClasses`)
    input.mdc-checkbox__native-control(ref="input" type="checkbox", v-bind="$attrs", :disabled="disabled", v-model="model")
    .mdc-checkbox__background
      svg.mdc-checkbox__checkmark(viewBox="0 0 24 24")
        path.mdc-checkbox__checkmark__path(fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59")
      .mdc-checkbox__mixedmark
</template>

<script>
export default {
  name: "MdcCheckbox",
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    checked: Boolean,
    indeterminate: Boolean
  },
  model: {
    prop: "checked",
    event: "change"
  },
  watch: {
    indeterminate: {
      immediate: true,
      handler(value) {
        this.$nextTick(() => {
          const { input } = this.$refs;
          if(input && input.indeterminate !== value) {
            input.indeterminate = value;
          }
        });
      }
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
    },
    cssClasses() {
      return {
        "mdc-checkbox--disabled": this.disabled
      };
    }
  }
};
</script>