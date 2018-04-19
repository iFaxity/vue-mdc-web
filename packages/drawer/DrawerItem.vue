<template lang="pug">
mdc-link.mdc-list-item(tag="a", :link="link", v-bind="$_link", v-on="$listeners")
  slot(name="graphic")
  | {{ text }}
</template>

<script>
import { Ripple } from "../ripple";
import RouterLink from "../app/routerLink";

export default {
  name: "MDCDrawerItem",
  mixins: [ Ripple(), RouterLink("mdc-list-item--activated") ],
  props: {
    link: String,
    text: {
      type: String,
      required: true
    }
  }
};
</script>