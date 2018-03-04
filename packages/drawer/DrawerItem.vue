<template lang="pug">
//a.mdc-list-item(:href="link")
mdc-link.mdc-list-item(v-bind="$_link", tag="a", :link="link")
  slot(name="graphic")
  | {{ text }}
</template>

<script>
import { Ripple } from "../ripple";
import RouterLink from "../app/routerLink";

export default {
  name: "MdcDrawerItem",
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