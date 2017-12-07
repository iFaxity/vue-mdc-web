<template lang="pug">
li.mdc-list-item
  slot
</template>

<script>
export default {
  name: "MdcListItem",
  props: {
    icon: String,
    image: String,
  },
  computed: {},
  methods: {}
};
</script>