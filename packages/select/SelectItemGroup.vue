<template lang="pug">
optgroup(:label="label")
  slot
</template>

<script>
export default {
  name: 'MDCSelectItemGroup',
  props: {
    label: {
      type: String,
      required: true
    },
  },
};
</script>