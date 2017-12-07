<template lang="pug">
  component(:is=`link ? "a" : "button"`, :class="cssClasses", :href="link", v-on="$listeners")
    i.material-icons.mdc-button__icon(v-if="icon") {{icon}}
    slot
</template>

<script>

export default {
  name: "MdcButton",
  props: {
    icon: String,
    raised: Boolean,
    unelevated: Boolean,
    stroked: Boolean,
    dense: Boolean,
    compact: Boolean,
    secondary: Boolean,
    ripple: {
      type: Boolean,
      default: true
    },

    link: String
  },
  computed: {
    cssClasses() {
      return {
        "mdc-button": true,
        "mdc-button--raised": this.raised,
        "mdc-button--unelevated": this.unelevated,
        "mdc-button--stroked": this.stroked,
        "mdc-button--dense": this.dense,
        "mdc-button--compact": this.compact,
        "secondary-filled-button": this.secondary
      };
    }
  }
};
</script>