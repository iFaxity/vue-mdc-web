<template lang="pug">
.mdc-chip
  mdc-icon.mdc-chip__icon--leading(v-if="leadingIcon", v-bind="leadingIcon")
  .mdc-chip__text {{ text }}
  mdc-icon.mdc-chip__icon--trailing(v-if="trailingIcon", v-bind="trailinIcon")
</template>

<script>
import Foundation from "@material/chips/chip/foundation";
import { Ripple } from "../ripple";
import MdcIcon from "../icon";

export default {
  name: "MdcChip",
  mixins: [ Ripple() ],
  components: { MdcIcon },
  props: {
    text: {
      type: String,
      required: true
    },
    entry: Boolean,
    filter: Boolean,
    action: String,
  },
  computed: {
    leadingIcon() {
      if(this.entry) {
        return {
          name: "chip",
          icon: "face"
        };
      } else if(this.filter) {
        return null;
      } else if(this.action) {
        return {
          name: "chip",
          icon: this.action
        };
      }
    },
    trailingIcon() {
      if(this.entry) {
        return {
          name: "chip",
          icon: "more_vert",
          label: "More options",
          action: true
        };
      } else if(this.filter) {
        return {
          name: "chip",
          icon: "cancel",
          action: true
        };
      } else if(this.action) {
        return null;
      }
    }
  },
  mounted() {
    this.foundation = new Foundation({
      registerInteractionHandler: (type, handler) => this.$el.addEventListener(type, handler),
      deregisterInteractionHandler: (type, handler) => this.$el.removeEventListener(type, handler),
      notifyInteraction: () => this.$emit("click")
    });
    this.foundation.init();
  }
};
</script>