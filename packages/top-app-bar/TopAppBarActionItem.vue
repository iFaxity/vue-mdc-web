<template lang="pug">
mdc-icon.mdc-top-app-bar__action-item(tag="a", :icon="icon", :label="label", :href="link") {{ icon }}
</template>

<script>
import MDCIcon from '../icon';

export default {
  name: 'MDCTopAppBarActionItem',
  components: { MdcIcon: MDCIcon },
  props: {
    icon: {
      type: String,
      required: true
    },
    label: String,
    link: String
  }
};
</script>