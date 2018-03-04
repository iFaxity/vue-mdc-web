<template lang="pug">
.mdc-card__actions(:class="cssClasses")
  slot
  .mdc-card__action-buttons(v-if="hasButtons")
    slot(name="buttons")
  .mdc-card__action-icons(v-if="hasIcons")
    slot(name="icons")
</template>

<script>

export default {
  name: "MdcCardActions",
  props: {
    fullBleed: Boolean
  },
  computed: {
    cssClasses() {
      return this.fullBleed && "mdc-card__actions--full-bleed";
    },
    hasButtons() {
      return !!this.$slots.buttons;
    },
    hasIcons() {
      return !!this.$slots.icons;
    }
  },
  mounted() {
    const buttons = this.$el.querySelectorAll(".mdc-button");
    const icons = this.$el.querySelectorAll(".mdc-icon-toggle");

    buttons.forEach(button => {
      button.classList.add("mdc-card__action");
      button.classList.add("mdc-card__action--button");
    });
    icons.forEach(icon => {
      icon.classList.add("mdc-card__action");
      icon.classList.add("mdc-card__action--icon");
    });
  }
};
</script>