<template lang="pug">
.mdc-radio(:class=`cssClasses`)
  input.mdc-radio__native-control(type="radio" v-bind="$attrs" v-model="model", :disabled="disabled")
  .mdc-radio__background
    .mdc-radio__outer-circle
    .mdc-radio__inner-circle
</template>

<script>
export default {
  name: "MdcRadio",
  inheritAttrs: false,
  props: {
    disabled: Boolean,
    checked: Boolean
  },
  model: {
    prop: "checked",
    event: "change",
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
        "mdc-radio--disabled": this.disabled
      };
    }
  }
};
</script>