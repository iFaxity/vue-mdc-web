<template lang="pug">
.mdc-form-field(:class="cssClasses")
  slot
  label {{ label }}
</template>

<script>
export default {
  name: "MDCFormField",
  props: {
    label: {
      type: String,
      required: true
    },
    alignEnd: Boolean
  },
  computed: {
    cssClasses() {
      return this.alignEnd && "mdc-form-field--align-end";
    }
  }
};
</script>