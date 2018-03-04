<template lang="pug">
li.mdc-list-item(role="menuitem", tabindex="0") {{ text }}
</template>

<script>
export default {
  name: "MdcMenuItem",
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>