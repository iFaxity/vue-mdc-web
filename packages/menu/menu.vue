<template lang="pug">
.mdc-simple-menu(:class=`cssClasses` tabindex="-1")
  mdc-list.mdc-simple-menu__items
<div class="mdc-simple-menu" tabindex="-1">
  <ul class="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
    <li class="mdc-list-item" role="menuitem" tabindex="0">
      A Menu Item
    </li>
    <li class="mdc-list-item" role="menuitem" tabindex="0">
      Another Menu Item
    </li>
  </ul>
</div>
</template>

<script>
import { childIndex } from "../mdc-utils";

export default {
  name: "MdcMenu",
  props: {},
  data() {
    return { active: false };
  },
  computed: {
    cssClasses() {
      return {};
    }
  },
  methods: {
    open() {

    },
    hide() {

    }
  }
};
</script>