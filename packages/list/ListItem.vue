<template lang="pug">
li.mdc-list-item(v-on="$listeners")
  slot(name="graphic")
  span.mdc-list-item__text(v-if="secondary")
    span.mdc-list-item__primary-text {{ text }}
    span.mdc-list-item__secondary-text {{ secondary }}

  span.mdc-list-item__text(v-else) {{ text }}
  slot(name="meta")
</template>

<script>
import { Ripple } from '../ripple';

export default {
  name: 'MDCListItem',
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
