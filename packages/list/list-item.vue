<template lang="pug">
component.mdc-list-item(:is=`link ? "a" : "li"`, :class=`cssClasses`)
  slot
</template>

<script>
export default {
  name: "MdcListItem",
  props: {
    active: Boolean,
    link: Boolean,
    icon: String,
    image: String
  },
  computed: {
    cssClasses() {
      return {
        "mdc-list-item--activated": this.active
      };
    }
  },
  render(h) {
    if(this.$slots.startdetail) {

    }
    if(this.$slots.enddetail) {

    }
  }
};
</script>