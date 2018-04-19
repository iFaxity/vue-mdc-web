<template lang="pug">
demo-template
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
    demo-code(lang="markup", code=`
<mdc-dialog ref="dialog"/>
`)

    p You can then open the dialog using any interaction through javascript. Like in this example a mdc-button
    demo-code(lang="markup", code=`
<mdc-dialog ref="dialog"/>
<mdc-button @click="$refs.dialog.open()"/>
`)

  template(slot="props")
    tr
      td header
      td String
      td ""
      td Sets the text of the dialog header
    tr
      td scroll
      td Boolean
      td false
      td Sets the dialog to a set height and makes it scrollable
    tr
      td valid
      td Boolean
      td true
      td When false the accept button is disabled. Preventing accept button from being pressed.
    tr
      td acceptText
      td String
      td "Ok"
      td Sets the text of the accept button
    tr
      td cancelText
      td String
      td "Cancel"
      td Sets the text of the cancel button

  template(slot="events")
    tr
      td accept
      td
      td Emitted when dialog accept button was pressed
    tr
      td cancel
      td
      td Emitted when dialog canceled byt pressing the button, the backdrop or keys such as esc etc.  
    tr
      td action
      td action
      td Emitted before either "cancel" or "accept" is emitted. The parameter "action" is either "cancel" or "accept".
</template>

<script>
import DemoTemplate from "../DemoTemplate.vue";

export default {
  name: "DemoDialog",
  components: { DemoTemplate },
  computed: {
    dialogValid() {
      return !!this.selectedItem && this.selectedItem !== "Kiwi";
    }
  },
  data() {
    return { selectedItem: "" };
  },
  methods: {
    openValidDialog() {
      this.selectedItem = "";
      this.$refs.validDialog.open();
    }
  }
};
</script>