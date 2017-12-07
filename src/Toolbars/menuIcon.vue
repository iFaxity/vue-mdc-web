<template lang="pug">
  component.material-icons.mdc-toolbar__menu-icon(:is=`link ? "a" : "button"`, :href="link" v-on="$listeners") menu
</template>

<script>
export default {
  name: "MdcToolbarMenuIcon",
  props: {
    link: String
  }
};
</script>