<template lang="pug">
mdc-icon(action, :icon="icon", :label="label") {{ icon }}
</template>

<script>
import MDCIcon from '../icon';

export default {
  name: 'MDCCardIcon',
  components: { MdcIcon: MDCIcon },
  props: {
    icon: {
      type: String,
      required: true
    },
    label: String
  }
};
</script>