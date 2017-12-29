<template lang="pug">
aside.mdc-persistent-drawer(:class=`cssClasses`)
  nav.mdc-persistent-drawer__drawer(@transitionend="animating = false") 
    .mdc-permanent-drawer__toolbar-spacer(v-if="spacer")
    header.mdc-persistent-drawer__header(v-if="$slots.header")
      .mdc-persistent-drawer__header-content
        slot(name="header")
    nav.mdc-persistent-drawer__content.mdc-list
      slot
</template>

<script>
export default {
  name: "MdcPersistentDrawer",
  props: {
    spacer: Boolean
  },
  data() {
    return { isOpen: false, animating: false };
  },
  computed: {
    cssClasses() {
      return {
        "mdc-persistent-drawer--open": this.isOpen,
        "mdc-persistent-drawer--animating": this.animating
      };
    }
  },
  methods: {
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