<template lang="pug">
nav.mdc-drawer.mdc-drawer--permanent.mdc-typography
  .mdc-drawer__toolbar-spacer(v-if="spacer")
  .mdc-drawer__content
    nav.mdc-list
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