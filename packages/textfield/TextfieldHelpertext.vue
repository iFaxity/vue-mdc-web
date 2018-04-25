<template lang="pug">
p.mdc-text-field-helper-text(:class="cssClasses", aria-hidden="true")
  slot
</template>

<script>
export default {
  name: 'MDCTextfieldHelpertext',
  props: {
    persistent: Boolean,
    validation: Boolean
  },
  computed: {
    cssClasses() {
      return {
        'mdc-text-field-helper-text--persistent': this.persistent,
        'mdc-text-field-helper-text--validation-msg': this.validation
      };
    }
  }
};
</script>