<template lang="pug">
component(:is="view")
</template>

<script>
export default {
  name: 'DemoView',
  computed: {
    view() {
      const { view } = this.$route.params;
      return `demo-${view}`;
    }
  }
};
</script>