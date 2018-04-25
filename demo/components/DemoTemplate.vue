<template lang="pug">
main.demo-app
  section.demo-app__hero(v-if="hasHero", :class="cssClasses")
    slot(name="hero")

  article.demo-app__content
    section.demo-app__usage
      h2
        | Usage 
        a(:href="link", target="_blank") #material.io
      p To use the component type this into your Vue Component
      slot(name="usage")
    
    section.demo-app__data
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
  props: {
    link: String,
    stacked: Boolean
  },
  computed: {
    link() {
      const { view } = this.$route.params;
      return `//material.io/components/web/catalog/${view}/`;
    },
    cssClasses() {
      return {
        'demo-app__hero--stacked': this.stacked
      }
    },
    hasSlots() {
      return !!this.$slots.slots;
    },
    hasEvents() {
      return !!this.$slots.events;
    },
    hasHero() {
      return !!this.$slots.hero;
    }
  }
};
</script>