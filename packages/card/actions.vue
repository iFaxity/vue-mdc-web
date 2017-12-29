<template lang="pug">
section.mdc-card__actions(:class=`cssClasses`)
  mdc-button(v-for="action in actions") {{action}}
</template>

<script>
export default {
  name: "MdcCardActions",
  inheritAttrs: false,
  props: {
    vertical: Boolean,
    actions: {
      type: Array,
      required: true
    }
  },
  computed: {}
};
</script>