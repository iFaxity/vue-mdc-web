<template lang="pug">
h3.mdc-list-group__subheader {{ text }}
</template>

<script>
export default {
  name: "MDCListGroupSubheader",
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>