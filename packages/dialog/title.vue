<template lang="pug">
component(:is=`"h" + level`).mdc-dialog__header__title
  slot
</template>

<script>
export default {
  name: "MdcDialogTitle",
  props: {
    level: {
      type: [Number, String],
      default: 2,
      validator: value => value >= 1 && value <= 6
    }
  }
};
</script>