<template lang="pug">
table
  thead
    tr
      th(v-for="header in headers") {{ header }}
  tbody
    slot
</template>

<script>
const SLOT_HEADERS = [ "Slot", "Description" ];
const PROP_HEADERS = [ "Prop", "Type", "Default", "Description" ];
const EVENT_HEADERS = [ "Event", "Args", "Description" ]

export default {
  name: "DemoTable",
  props: {
    props: Boolean,
    slots: Boolean,
    events: Boolean
  },
  computed: {
    headers() {
      if(this.props) {
        return PROP_HEADERS;
      } else if(this.slots) {
        return SLOT_HEADERS;
      } else if(this.events) {
        return EVENT_HEADERS;
      }
    }
  },
};
</script>