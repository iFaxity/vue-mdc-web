<template lang="pug">
component.material-icons.mdc-toolbar__menu-icon(:is="tag", :href="link", v-on="$listeners") menu
</template>

<script>
export default {
  name: "MDCToolbarMenuIcon",
  props: {
    link: String
  },
  computed: {
    tag() {
      return this.link ? "a" : "button";
    }
  }
};
</script>