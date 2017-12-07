<template lang="pug">
  component(:is=`nav ? "nav" : "ul"`)
    slot
</template>

<script>
export default {
  name: "MdcList",
  props: {
    nav: Boolean,
    dense: Boolean,
    avatar: Boolean
  }
};
</script>


