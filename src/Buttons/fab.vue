<template lang="pug">
  button(:class="cssClasses", :aria-label="label")
    span.mdc-fab__icon {{icon}}
</template>

<script>
export default {
  name: "MdcFab",
  props: {
    mini: Boolean,
    exited: Boolean,

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
        "mdc-fab": true,
        "material-icons": true,
        "mdc-fab--mini": this.mini,
        "mdc-fab--exited": this.exited
      };
    }
  }
};
</script>