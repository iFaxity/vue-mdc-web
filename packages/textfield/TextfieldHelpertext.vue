<template lang="pug">
p.mdc-text-field-helper-text(aria-hidden="true", :class="cssClasses")
  slot
</template>

<script>
export default {
  name: "MdcTextfieldHelpertext",
  props: {
    persistent: Boolean,
    validation: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-text-field-helper-text--persistent": this.persistent,
        "mdc-text-field-helper-text--validation-msg": this.validation
      };
    }
  }
};
</script>