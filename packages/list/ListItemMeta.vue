<template lang="pug">
mdc-link.mdc-list-item__meta(:is="tag", :class="cssClasses", :aria-label="icon && label", :aria-hidden="icon && 'true'", :href="link") {{ content }}
</template>

<script>
export default {
  name: "MDCListItemMeta",
  props: {
    icon: String,
    label: String,
    link: String
  },
  computed: {
    cssClasses() {
      return {
        "material-icons": this.icon
      };
    },
    content() {
      return this.icon || this.label;
    },
    tag() {
      if(this.link) {
        return "a";
      }
      return this.icon ? "i" : "span";
    }
  }
};
</script>