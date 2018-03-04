<template lang="pug">
.mdc-card(:class="cssClasses")
  slot
</template>

<script>
export default {
  name: "MdcCard",
  props: {
    stroked: Boolean
  },
  computed: {
    cssClasses() {
      return this.stroked && "mdc-card--stroked";
    }
  }
};
</script>