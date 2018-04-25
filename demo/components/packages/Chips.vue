<template lang="pug">
demo-template(stacked, link="chips")
  template(slot="hero")
    h3 Basic
    mdc-chip-set
      mdc-chip(text="Chip one")
      mdc-chip(text="Chip two")
      mdc-chip(text="Chip three", leading-icon="bookmark")
    h3 Input
    mdc-chip-set(input)
      mdc-chip(v-for="chip in chips", :key="chip", :text="chip")
    h3 Choice (selected: {{ selectChoice }})
    mdc-chip-set(choice, v-model="selectChoice")
      mdc-chip(text="Chip one")
      mdc-chip(text="Chip two", value="chip 2")
      mdc-chip(text="Chip three", value="bookmark", leading-icon="bookmark")  
    h3 Filter (selected: {{ selectFilter }})
    mdc-chip-set(filter, v-model="selectFilter")
      mdc-chip(text="Chip 1")
      mdc-chip(text="Chip 2", value="chip 2")
      mdc-chip(text="Chip 3", value="bookmark", leading-icon="bookmark")    

  template(slot="usage")
    demo-code(lang="markup", code=`
<mdc-chip text="My Chip"/>`)

    p It is also possible to use a MDCChipSet in order to view multiple chips in order like this.
    p Also when using a MDCChipSet you can use filtered and choice chips which lets you select either 1 or multiple chips for a v-model.
    demo-code(lang="markup", code=`
<mdc-chip-set>
  <mdc-chip text="Chip 1"/>
  <mdc-chip text="Chip 2"/>
  <mdc-chip text="Chip 3"/>
</mdc-chip-set>`)

  template(slot="events")
    tr
      th(colspan="3") MDCChip
    tr
      td click
      td
      td Emits when the chip is clicked.
    tr
      td icon
      td
      td Emits when the trailing icon of the chip is clicked.  
    tr
      th(colspan="3") MDCChipSet
    tr
      td select
      td value
      td Emits when any chip is selected or deselected. #[em value] is a String or Array of selected chips value.

  template(slot="props")
    tr
      th(colspan="4") MDCChip
    tr
      td text *
      td String
      td ""
      td Sets the text content of the chip
    tr
      td value
      td String
      td ""
      td Sets the value used in the v-model of the MDCChipSet. Defaults to text prop value.
    tr
      td leadingIcon
      td String
      td ""
      td Adds a icon from the material icons repo before the other content.
    tr
      td trailingIcon
      td String
      td ""
      td Adds a icon from the material icons repo after the other content.
    tr
      th(colspan="4") MDCChipSet
    tr
      td input
      td Boolean
      td false
      td Adds entry and exit animation to chip. It's recommended to use v-for with a key on each MDCChip.
    tr
      td choice
      td Boolean
      td false
      td Adds single select. Also binds to model as the string value the selected chip possesses.
    tr
      td filter
      td Boolean
      td false
      td Adds multiple select. Also binds to v-model as the string values of the selected chips.
    tr
      td selected
      td Array, String
      td undefined
      td Adds a model for the select chips. Needs filter or choice to be set to work.

</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

export default {
  name: 'DemoChips',
  components: { DemoTemplate },
  data() {
    return {
      chips: [ 'Chip one', 'Chip two', 'Chip three' ],
      selectFilter: [],
      selectChoice: '',
      inputInterval: 0
    };
  },

  mounted() {
    // Showcase input chips
    this.inputInterval = setInterval(() => {
      if(this.chips.length === 4) {
        this.chips.splice(3, 1); // remove last chip
      } else {
        this.chips.push('Chip four');
      }
      this.$nextTick(() => {
        debugger;
      });
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.inputInterval);
  }
};
</script>