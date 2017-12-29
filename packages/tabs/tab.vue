<template lang="pug">
a.mdc-tab(:class=`cssClasses`, :href="href", role="tab", :aria-controls="controls")
  template(v-if="icon")
    i.material-icons.mdc-tab__icon(aria-hidden="true") {{icon}}
    span.mdc-tab__icon-text(v-if="text") {{text}}
  template(v-else) {{text}}
</template>

<script>
export default {
  name: "MdcTab",
  props: {
    href: {
      type: String,
      required: true
    },
    icon: String,
    text: String,
    controls: String,
  },
  computed: {
    cssClasses() {
      return {

      };
    }
  },
  methods: {}
};
</script>