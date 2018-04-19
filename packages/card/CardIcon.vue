<template lang="pug">
mdc-icon(action, :icon="icon", :label="label") {{ icon }}
</template>

<script>
import MdcIcon from "../icon";

export default {
  name: "MDCCardIcon",
  components: { MdcIcon },
  props: {
    icon: {
      type: String,
      required: true
    },
    label: String
  }
};
</script>