<template lang="pug">
hr.mdc-list-divider(:class="cssClasses")
</template>

<script>
export default {
  name: 'MDCListGroupDivider',
  props: {
    inset: Boolean
  },
  computed: {
    cssClasses() {
      return this.inset && 'mdc-list-divider--inset';
    }
  }
};
</script>