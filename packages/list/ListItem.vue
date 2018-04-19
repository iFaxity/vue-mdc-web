<template lang="pug">
li.mdc-list-item
  slot(name="graphic")
  span.mdc-list-item__text {{ text }}
    span.mdc-list-item__secondary(v-if="secondary") {{ secondary }}
  slot(name="meta")
</template>

<script>
import { Ripple } from "../ripple";
//TODO: support router links?

export default {
  name: "MDCListItem",
  mixins: [ Ripple() ],
  props: {
    text: {
      type: String,
      required: true
    },
    secondary: String
  }
};
</script>