<template lang="pug">
.mdc-card__media(:class="cssClasses", :style="cssStyles")
  .mdc-card__media-content(v-if="hasContent")
    slot
</template>

<script>

export default {
  name: "MDCCardMedia",
  props: {
    square: Boolean,
    image: String
  },
  computed: {
    cssStyles() {
      return this.image && `background-image: url(${this.image});`;
    },
    cssClasses() {
      return this.square ? "mdc-card__media--square" : "mdc-card__media--16-9";
    },
    hasContent() {
      return !!this.$slots.default;
    }
  }
};
</script>