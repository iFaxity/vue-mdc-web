<template lang="pug">
.mdc-chip(tabindex="0")
  mdc-icon.mdc-chip__icon--leading(v-if="leadingIcon", ref="leadingIcon", :icon="leadingIcon")

  .mdc-chip__checkmark(v-if="filter")
    svg.mdc-chip__checkmark-svg(viewBox="-2 -3 30 30")
      path.mdc-chip__checkmark-path(fill="none", stroke="black", d="M1.73,12.91 8.1,19.28 22.79,4.59")

  .mdc-chip__text {{ text }}
  mdc-icon.mdc-chip__icon--trailing(v-if="trailingIcon", :icon="trailingIcon", action)
</template>

<script>
import { MDCChipFoundation } from '@material/chips';
import { Ripple } from '../ripple';
import MDCIcon from '../icon';
import { emitCustomEvent } from "../util";

export default {
  name: 'MDCChip',
  mixins: [ Ripple() ],
  components: { MdcIcon: MDCIcon },
  inject: [ 'MDCChipSet' ],
  
  props: {
    text: {
      type: String,
      required: true
    },
    value: String,
    leadingIcon: String,
    trailingIcon: String
  },
  computed: {
    filter() {
      return this.MDCChipSet.filter;
    }
  },

  mounted() {
    const { $el } = this;
    const styles = window.getComputedStyle($el);
    const { INTERACTION_EVENT, REMOVAL_EVENT } = MDCChipFoundation.strings;

    this.foundation = new MDCChipFoundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      hasClass: className => $el.classList.contains(className),
      addClassToLeadingIcon: className => {
        const { leadingIcon } = this.$refs;
        leadingIcon && leadingIcon.$el.classList.add(className);
      },
      removeClassFromLeadingIcon: className => {
        const { leadingIcon } = this.$refs;
        leadingIcon && leadingIcon.$el.classList.remove(className);
      },
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      registerEventHandler: (type, handler) => $el.addEventListener(type, handler),
      deregisterEventHandler: (type, handler) => $el.removeEventListener(type, handler),
      registerTrailingIconInteractionHandler: (type, handler) => {
        const { trailingIcon } = this.$refs;
        trailingIcon && trailingIcon.addEventListener(type, handler);
      },
      deregisterTrailingIconInteractionHandler: (type, handler) => {
        const { trailingIcon } = this.$refs;
        trailingIcon && trailingIcon.removeEventListener(type, handler);
      },
      notifyInteraction: () => {
        const { filter, choice, select, deselect } = this.MDCChipSet;
        // Select for the v-model
        if(filter || choice) {
          const value = this.value || this.text;
          if(this.foundation.isSelected()) {
            deselect(value);
          } else {
            select(value);
          }
        }

        // Emit both native event and vue event
        emitCustomEvent(this.$el, INTERACTION_EVENT, { chip: this }, true);
        this.$emit('click');
      },
      notifyTrailingIconInteraction: () => this.emit('icon'),
      notifyRemoval: () => {
        emitCustomEvent(this.$el, REMOVAL_EVENT, { chip: this }, true);
      },
      getComputedStyleValue: prop => styles.getPropertyValue(prop),
      setStyleProperty: (prop, value) => $el.style.setProperty(prop, value),
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};
</script>