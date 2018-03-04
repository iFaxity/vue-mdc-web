<template lang="pug">
component.material-icons(:is="tag", :class="cssClasses", :tabindex="action && '0'", :role="action && 'button'", :aria-hidden="!action && 'true'", :aria-label="label") {{ icon }}
</template>

<script>
export default {
  name: "MdcIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    
    action: Boolean,
    label: String,
    tag: {
      type: String,
      default: "i"
    }
  },
  computed: {
    cssClasses() {
      return `mdc-${this.name}__icon`;
    }
  }
};
</script>