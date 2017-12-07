<template lang="pug">
  aside.mdc-dialog(:class=`cssClasses`, aria-labelledby="" aria-describedby="")
    .mdc-dialog__surface(@transitionend="animating = false")
      header.mdc-dialog__header(v-if="$slots.header")
        slot(name="header")
      section(v-if="$slots.default", :class="cssBodyClasses")
        slot
      footer.mdc-dialog__footer
        slot(name="footer")
          mdc-button.mdc-dialog__footer__button(@click="decline") Cancel
          mdc-button.mdc-dialog__footer__button(@click="accept") Ok
    .mdc-dialog__backdrop(@click="decline")
</template>

<script>
export default {
  name: "MdcDialog",
  props: {
    scrollable: Boolean
  },
  data() {
    return { isOpen: false, animating: false };
  },
  computed: {
    cssBodyClasses() {
      return {
        "mdc-dialog__body": true,
        "mdc-dialog__body--scrollable": this.scrollable
      };
    },
    cssClasses() {
      return {
        "mdc-dialog--open": this.isOpen,
        "mdc-dialog--animating": this.animating
      };
    }
  },
  methods: {
    open() {
      if(this.isOpen) return false;

      document.body.classList.add("mdc-dialog-scroll-lock");
      this.animating = true;
      this.isOpen = true;
      return true;
    },
    close() {
      if(!this.isOpen) return false;
      
      document.body.classList.remove("mdc-dialog-scroll-lock");
      this.animating = true;
      this.isOpen = false;
      return true;
    },
    accept(emit = true) {
      if(this.close() && emit) {
        this.$emit("action", "accept");
        this.$emit("accept");
      }
    },
    decline(emit = true) {
      if(this.close() && emit) {
        this.$emit("action", "decline");
        this.$emit("cancel");
      }
    }
  }
};
</script>