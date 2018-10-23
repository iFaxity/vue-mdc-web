<template lang="pug">
option(:value="value || label", :disabled="disabled") {{ label }}
</template>

<script>
export default {
  name: 'MDCSelectItem',
  props: {
    label: {
      type: [String, Number],
      required: true,
    },
    disabled: Boolean,
    value: [String, Number],
  }
};
</script>