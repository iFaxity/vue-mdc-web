<template lang="pug">
main
  slot

  h2 Usage
  p To use the component type this into your component
  slot(name="usage")
  
  template(v-if="hasSlots")
    h2 Slots
    demo-table(slots)
      slot(name="slots")

  h2 Props
  demo-table(props)
    slot(name="props")

  template(v-if="hasEvents")
    h2 Events
    demo-table(events)
      slot(name="events")
</template>

<script>
export default {
  name: "DemoTemplate",
  computed: {
    hasSlots() {
      return !!this.$slots.slots;
    },
    hasEvents() {
      return !!this.$slots.events;
    }
  }
};
</script>