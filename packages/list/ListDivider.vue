<template lang="pug">
li.mdc-list-divider(:class="cssClasses", role="separator")
</template>

<script>
export default {
  name: 'MDCListDivider',
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