<template lang="pug">
  component.material-icons.mdc-toolbar__icon(:is=`link ? "a" : "button"`)
    slot
</template>

<script>
export default {
  name: "MdcToolbarIcon",
  props: {
    link: String
  }
};
</script>