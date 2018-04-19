<template lang="pug">
li.mdc-list-item(role="menuitem", tabindex="0") {{ text }}
</template>

<script>
export default {
  name: "MDCMenuItem",
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>