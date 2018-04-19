<template lang="pug">
.mdc-card__actions(:class="cssClasses")
  slot
  .mdc-card__action-buttons(v-if="hasButtons")
    slot(name="button")
  .mdc-card__action-icons(v-if="hasIcons")
    slot(name="icon")
</template>

<script>

export default {
  name: "MDCCardActions",
  props: {
    fullBleed: Boolean
  },
  computed: {
    cssClasses() {
      return this.fullBleed && "mdc-card__actions--full-bleed";
    },
    hasButtons() {
      return !!this.$slots.button;
    },
    hasIcons() {
      return !!this.$slots.icon;
    }
  },
  beforeMount() {
    const addClass = ({ data }, className) => {
      if(data.staticClass) {
        data.staticClass += ` ${className}`;
      } else {
        data.staticClass = className;
      }
    };
    this.$slots.button && this.$slots.button.forEach(button => addClass(button, "mdc-card__action mdc-card__action--button"));
    this.$slots.icon && this.$slots.icon.forEach(icon => addClass(icon, "mdc-card__action mdc-card__action--icon"));
  }
};
</script>