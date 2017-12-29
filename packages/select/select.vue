<template lang="pug">
.mdc-select(role="listbox" tabindex="0")
  span.mdc-select__selected-text {{text}}
  .mdc-simple-menu.mdc-select__menu
    ul.mdc-list.mdc-simple-menu__items

</template>

<script>
//TODO: complete after created mdc-list and mdc-menu
export default {
  name: "MdcSelect",
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>