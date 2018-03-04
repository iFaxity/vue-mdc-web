<template lang="pug">
component.mdc-list-item__graphic(:is="tag", :class="cssClasses", :aria-label="icon && label", :aria-hidden="icon && 'true'", :src="src", :title="title") {{ icon }}
</template>

<script>
export default {
  name: "MdcListItemGraphic",
  props: {
    icon: String,
    label: String,
    src: String,
  },
  computed: {
    cssClasses() {
      return {
        "material-icons": this.icon
      };
    },
    tag() {
      return this.src ? "img" : "i";
    }
  }
};
</script>