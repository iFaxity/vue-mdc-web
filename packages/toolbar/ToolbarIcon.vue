<template lang="pug">
mdc-icon(:tag="tag", name="toolbar", :icon="icon", :label="label", :href="link") {{ icon }}
</template>

<script>
//component.material-icons.mdc-toolbar__icon(:is="tag", :href="link", :aria-label="label")
import MdcIcon from "../icon";

export default {
  name: "MdcToolbarIcon",
  components: { MdcIcon },
  props: {
    link: String,
    label: String,
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    tag() {
      return this.link ? "a" : "button";
    }
  }
};
</script>