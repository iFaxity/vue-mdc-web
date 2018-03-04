<template lang="pug">
li.mdc-list-divider(:class="cssClasses", role="separator")
</template>

<script>
export default {
  name: "MdcListDivider",
  props: {
    inset: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-list-divider--inset": this.inset
      };
    }
  }
};
</script>