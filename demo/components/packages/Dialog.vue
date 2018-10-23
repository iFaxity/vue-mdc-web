<template lang="pug">
demo-template(link="dialogs", :details="details")
  mdc-button(slot="hero", raised, @click="$refs.dialog.open()") Open dialog
  mdc-button(slot="hero", raised, @click="$refs.scrollDialog.open()") Open scrolling dialog
  mdc-button(slot="hero", raised, @click="openValidDialog") Open validation dialog

  // <dialogs>
  mdc-dialog(slot="hero", ref="dialog", header="This is a dialog")
    | This is a demo dialog which you can accept or decline
  mdc-dialog(slot="hero", ref="scrollDialog", scroll, header="This is a scrolling dialog")
    mdc-list
      mdc-list-item(text="Green Eggs")
      mdc-list-item(text="Ham")
      mdc-list-item(text="Biscuits")
      mdc-list-item(text="Milk")
      mdc-list-item(text="Jam")
      mdc-list-item(text="Peanut Butter")
      mdc-list-item(text="Juice")
  
  mdc-dialog(slot="hero", ref="validDialog", header="Select a fruit (not Kiwi)", :valid="dialogValid")
    mdc-form-field(label="Banana")
      mdc-radio(v-model="selectedItem", value="Banana")
    mdc-form-field(label="Apple")  
      mdc-radio(v-model="selectedItem", value="Apple")
    mdc-form-field(label="Peach")
      mdc-radio(v-model="selectedItem", value="Peach")
    mdc-form-field(label="Kiwi (yuck)")
      mdc-radio(v-model="selectedItem", value="Kiwi")
  // </dialogs>

  template(slot="usage")
    demo-code(lang="markup", code=`<mdc-dialog ref="dialog"/>`)

    p You can then open the dialog using any interaction through javascript. Like in this example with a MDCButton:
    demo-code(lang="markup", code=`
<mdc-dialog ref="dialog"/>
<mdc-button @click="$refs.dialog.open()"/>`)
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

const DATA = {
  slots: [
    { name: 'default', desc: 'Content that goes into the body of the dialog.' },
  ],
  props: [
    { name: 'header', type: 'String', desc: 'Sets the text of the dialog header.' },
    { name: 'scroll', type: 'Boolean', desc: 'Sets the dialog to a set height and makes it scrollable.' },
    { name: 'valid', type: 'Boolean', desc: 'When false the accept button is disabled. Preventing accept button from being pressed.' },
    { name: 'accept-text', type: 'String', default: '"Ok"', desc: 'Sets the text of the accept button.' },
    { name: 'cancel-text', type: 'String', default: '"Cancel"', desc: 'Sets the text of the cancel button.' },
  ],
  events: [
    { name: 'accept', args: '', desc: 'Emitted when the dialog accept button was pressed.' },
    { name: 'cancel', args: '', desc: 'Emitted when the dialog canceled byt pressing the button, the backdrop or keys such as "esc" etc.  ' },
    { name: 'action', args: 'action', desc: 'Emitted before either "cancel" or "accept" is emitted. <em>action</em> can be either "cancel" or "accept".' },
  ],
};

export default {
  name: 'DemoDialog',
  components: { DemoTemplate },

  computed: {
    dialogValid() {
      return !!this.selectedItem && this.selectedItem !== 'Kiwi';
    },
  },
  data() {
    return {
      selectedItem: '',
      details: DATA,
    };
  },

  methods: {
    openValidDialog() {
      this.selectedItem = '';
      this.$refs.validDialog.open();
    },
  },
};
</script>