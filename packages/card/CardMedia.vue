<template lang="pug">
.mdc-card__media(:class="cssClasses", :style="cssStyles")
  .mdc-card__media-content(v-if="hasContent")
    slot
</template>

<script>
const RATIOS = ["16x9", "square"];

export default {
  name: "MdcCardMedia",
  props: {
    ratio: {
      type: String,
      validator: value => RATIOS.includes(value)
    },
    image: String
  },
  computed: {
    cssStyles() {
      return this.image && `background-image: ${this.image};`;
    },
    cssClasses() {
      return {
        "mdc-card__media--square": this.ratio === "square",
        "mdc-card__media--16-9": this.ratio === "16x9"
      };
    },
    hasContent() {
      return !!this.$slots.default;
    }
  }
};
</script>