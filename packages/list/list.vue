<template lang="pug">
ul.mdc-list(:class="cssClasses")
  slot
</template>

<script>
export default {
  name: "MDCList",
  props: {
    dense: Boolean,
    avatar: Boolean,
    twoLine: Boolean,
  },
  computed: {
    cssClasses() {
      return {
        "mdc-list--dense": this.dense,
        "mdc-list--avatar-list": this.avatar,
        "mdc-list--two-line": this.twoLine
      };
    }
  }
};
</script>


