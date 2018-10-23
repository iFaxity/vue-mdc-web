<template lang="pug">
demo-template(stacked, link="input-controls/select-menus", :details="details")
  template(slot="hero")
    mdc-select(v-model="selected", label="Basic select")
      mdc-select-item(label="Item one")
      mdc-select-item(disabled, label="Item disabled")
      mdc-select-item(label="Item two")
      mdc-select-item(label="Item three", value="item 3")

      mdc-select-item-group(label="Fruits")
        mdc-select-item(label="Apple")
        mdc-select-item(label="Banana")
        mdc-select-item(label="Orange")
      mdc-select-item-group(label="Meats")
        mdc-select-item(label="Steak")
        mdc-select-item(label="Pork", disabled)
        mdc-select-item(label="Chicken")
    // Show selected item
    p You've selected: {{ selected }}    

  template(slot="usage")
    demo-code(code=`
<mdc-select label="Basic select">
  <mdc-select-item label="Item"/>
</mdc-select>`)
    
    p To use group items use the MDCSelectItemGroup component
    demo-code(code=`
<mdc-select label="My select">
  <mdc-select-item-group label="Fruits">
    <mdc-select-item label="Apple"/>
    <mdc-select-item label="Banana"/>
    <mdc-select-item label="Orange"/>
  </mdc-select-item-group>

  <mdc-select-item-group label="Meats">
    <mdc-select-item label="Steak"/>
    <mdc-select-item label="Pork" disabled/>
    <mdc-select-item label="Chicken"/>
  </mdc-select-item-group>
</mdc-select>`)
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

const DATA = {
  slots: [],
  props: [
    { header: 'MDCSelect' },
    { name: 'label*', type: 'String', desc: 'Floating label text content.' },
    { name: 'boxed', type: 'Boolean', desc: 'Styles the select element with a visible box behind the select element.' },
    { name: 'disabled', type: 'Boolean', desc: 'Disables any input for the select element.' },
    { name: 'selected', type: 'String', desc: 'Sets the currently selected item.' },

    { header: 'MDCSelectItem' },
    { name: 'label*', type: 'String', desc: 'Select item text content.' },
    { name: 'disabled', type: 'Boolean', desc: 'Disables this item from any interaction.' },
    { name: 'value', type: 'String', desc: 'Specifies the value of the select item. If no value is specified the label is used instead.' },

    { header: 'MDCSelectItemGroup' },
    { name: 'label*', type: 'String', desc: 'Select item group text content.' },
  ],
  events: [],
};

export default {
  name: 'DemoSelect',
  components: { DemoTemplate },
  data() {
    return {
      selected: '',
      details: DATA,
    };
  },
};
</script>