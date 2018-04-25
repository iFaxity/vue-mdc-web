<template lang="pug">
mdc-icon(:tag="tag", name="toolbar", :icon="icon", :label="label", :href="link") {{ icon }}
</template>

<script>
import MdcIcon from '../icon';

export default {
  name: 'MDCToolbarIcon',
  components: { MdcIcon },
  props: {
    link: String,
    label: String,
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    tag() {
      return this.link ? 'a' : 'button';
    }
  }
};
</script>