<template lang="pug">
button.mdc-fab.material-icons(v-ripple="ripple", :aria-label="label", :class=`cssClasses`)
  span.mdc-fab__icon {{icon}}
</template>

<script>
export default {
  name: "MdcFab",
  props: {
    mini: Boolean,
    exited: Boolean,
    ripple: {
      type: Boolean,
      default: true
    },

    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    cssClasses() {
      return {
        "mdc-fab--mini": this.mini,
        "mdc-fab--exited": this.exited
      };
    }
  }
};
</script>