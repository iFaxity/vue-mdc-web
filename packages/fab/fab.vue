<template lang="pug">
button.mdc-fab.material-icons(:class="cssClasses", :aria-label="label", :title="label")
  span.mdc-fab__icon {{ icon }}
</template>

<script>
import { Ripple } from "../ripple";

export default {
  name: "MDCFab",
  mixins: [ Ripple() ],
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
        "mdc-fab--mini": this.mini,
        "mdc-fab--exited": this.exited
      };
    }
  }
};
</script>