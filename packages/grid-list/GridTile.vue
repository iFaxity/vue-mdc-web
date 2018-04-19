<template lang="pug">
li.mdc-grid-tile
  .mdc-grid-tile__primary
    .mdc-grid-tile__primary-content(v-if="cover", :style="coverStyle")
    img.mdc-grid-tile__primary-content(v-else, :src="src")
  span.mdc-grid-tile__secondary(v-if="hasSecondary")
    mdc-icon(v-if="icon", name="grid-tile", :icon="icon")
    span.mdc-grid-tile__title(v-if="title") {{ title }}
    span.mdc-grid-tile__support-text(v-if="text") {{ text }}


</template>

<script>
import MdcIcon from "../icon";

export default {
  name: "MDCGridTile",
  components: { MdcIcon },
  props: {
    cover: Boolean,
    title: String,
    text: String,
    icon: String,
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    coverStyle() {
      return `background-image: url(${src})`;
    },
    hasSecondary() {
      return this.text || this.title || this.icon;
    }
  }
};
</script>