<template lang="pug">
li.mdc-list-item(role="option", :aria-disabled="disabled && 'true'", :tabindex="disabled ? '-1' : '0'", :data-value="value") {{ label }}
</template>

<script>
export default {
  name: "MDCSelectItem",
  props: {
    disabled: Boolean,
    value: String,
    label: {
      type: String,
      required: true
    }
  }
};
</script>