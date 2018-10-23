<template lang="pug">
component.mdc-list-item__graphic(:is="tag", :class="cssClasses", :aria-label="icon && label", :aria-hidden="icon && 'true'", :src="src", :title="title") {{ icon }}
</template>

<script>
export default {
  name: 'MDCListItemGraphic',
  props: {
    icon: String,
    label: String,
    src: String,
    title: String,
  },
  computed: {
    cssClasses() {
      return this.icon && 'material-icons';
    },
    tag() {
      return this.src ? 'img' : 'i';
    }
  }
};
</script>
