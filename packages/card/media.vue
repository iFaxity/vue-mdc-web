<template lang="pug">
component(:is="tag")
</template>

<script>
const SIZES = [1.5, 2, 3];

export default {
  name: "MdcCardMedia",
  props: {
    size: Number,
    
  },
  computed: {
    tag() {

      return "section";
    }
  }
};
</script>