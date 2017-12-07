<template lang="pug">
nav.mdc-permanent-drawer.mdc-typography
  .mdc-permanent-drawer__toolbar-spacer(v-if="spacer")
  .mdc-permanent-drawer__content
    mdc-list
      slot


</template>

<script>
export default {
  name: "MdcPermanentDrawer",
  props: {
    spacer: Boolean
  }
};
</script>