<template lang="pug">
aside.mdc-temporary-drawer(:class=`cssClasses` @click="onClick")
  nav.mdc-temporary-drawer__drawer
    header.mdc-temporary-drawer__header(v-if="$slots.header")
      .mdc-temporary-drawer__header-content
        slot(name="header")
    nav.mdc-temporary-drawer__content.mdc-list
      slot
</template>

<script>
export default {
  name: "MdcTemporaryDrawer",
  data() {
    return { isOpen: false, animating: false };
  },
  computed: {
    cssClasses() {
      return {
        "mdc-temporary-drawer--open": this.isOpen,
        "mdc-temporary-drawer--animating": this.animating
      };
    }
  },
  methods: {
    onClick(e) {
      if(e.target === this.$el) {
        this.close();
      }
    },
    open(emit = true) {
      if(this.isOpen) return false;
      if(emit) {
        this.$emit("change", "open");
        this.$emit("open");
      }

      this.animating = true;
      this.isOpen = true;
      return true;
    },
    close(emit = true) {
      if(!this.isOpen) return false;
      if(emit) {
        this.$emit("change", "close");
        this.$emit("close");
      }

      this.animating = true;
      this.isOpen = false;
      return true;
    }
  }
};
</script>