<template lang="pug">
component.mdc-list-divider(:is=`hr ? "hr" : "li"`, :class=`cssClasses`, :role=`!hr && "separator"`)
</template>

<script>
export default {
  name: "MdcListDivider",
  props: {
    hr: Boolean,
    inset: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-list-divider--inset": this.inset
      };
    }
  }
};
</script>