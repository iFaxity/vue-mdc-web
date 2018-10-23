<template lang="pug">
main.demo-app
  section.demo-app__hero(v-if="hasHero", :class="cssClasses")
    slot(name="hero")

  article.demo-app__content
    section.demo-app__usage
      h2 Usage
      p(v-if="link") To get more in depth of how this component works you can read the #[a(:href="getLink", target="_blank") Material.io reference]

      p To use the component type this into your Vue component:
      slot(name="usage")
    
    section.demo-app__data
      template(v-if="details.slots")
        h2 Slots
        demo-table(type="slots", :rows="details.slots")

      h2 Props
      demo-table(type="props", :rows="details.props")

      template(v-if="details.events")
        h2 Events
        demo-table(type="events", :rows="details.events")
</template>

<script>
import DemoTable from './DemoTable.vue';

export default {
  name: 'DemoTemplate',
  components: { DemoTable },
  props: {
    link: String,
    stacked: Boolean,
    details: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getLink() {
      if(!this.link) return;
      return `https://material.io/components/web/catalog/${this.link}/`;
    },
    cssClasses() {
      return this.stacked && 'demo-app__hero--stacked';
    },
    hasHero() {
      return !!this.$slots.hero;
    }
  }
};
</script>