<template lang="pug">
component.mdc-list-group__subheader(:is=`"h" + level`)
  slot
</template>

<script>
export default {
  name: "MdcListGroupSubheader",
  props: {
    level: [Number, String],
    default: 3,
    validator: value => value >= 1 && value <= 6
  }
};
</script>