<template lang="pug">
#app
  mdc-toolbar(fixed="lastrow" waterfall flexible)
    mdc-toolbar-row
      mdc-toolbar-section(align="start")
        mdc-toolbar-menu-icon(@click=`$refs.drawer.open()`)

    mdc-toolbar-row
      mdc-toolbar-section(align="start")
        mdc-toolbar-title Material Components In Vuejs
      mdc-toolbar-section(align="end")
        mdc-toolbar-icon(aria-label="Download" alt="Download") file_download    
        mdc-toolbar-icon(aria-label="Print this page" alt="Print this page") print
        mdc-toolbar-icon(aria-label="Bookmark this page" alt="Bookmark this page") bookmark
  // Main content
  main(style="height: 2000px")
    // Button
    h2 Button
    mdc-button Click me
    mdc-button(icon="accessibility") Icon Button
    mdc-button(raised) Raised button
    mdc-button(unelevated) Unelevated button
    mdc-button(stroked) Stroked button
    mdc-button(dense) Dense button
    mdc-button(compact) Compact button
    mdc-button(secondary) Secondary button
    mdc-button(link="#") Link button

    // Fab
    h2 Fab
    // Icon Toggle
    h2 IconToggle

    // Dialog
    h2 Dialog
    mdc-button(raised @click="$refs.dialog.open()") Show Dialog
    p Result: {{dialogResult}}
    mdc-dialog(ref="dialog" @action="dialogAction")
      mdc-dialog-title(slot="header") Test dialog
      | This is just a test dialog click accept or decline to close the window

    h2 Slider
    mdc-slider(v-model="sliderValue" discrete :min="0" :max="50" :step="1" @input="onSliderInput")
    p Slider@change {{sliderValue}} Slider@input {{sliderInput}}

    h2 Checkbox
    mdc-checkbox(indeterminate v-model="checked")
    p Checked: {{checked}}

    h2 Textfield
    mdc-textfield(v-model="myName" box icon="mail" click-icon trailing-icon pattern="[A-Za-z]{5,10}") Enter your name
    mdc-textfield-helptext(validation) Enter a name between 5 and 10 characters
</template>

<script>

export default {
  name: "Test",
  data() {
    return { 
      dialogResult: "<none>", sliderValue: 25, sliderInput: 0, myName: "Cooldude",
      moveType: null, upType: null, canceled: false, checked: true
    };
  },
  methods: {
    dialogAction(action) {
      this.dialogResult = action;
    },
    onSliderInput(value) {
      this.sliderInput = value;
    },

    onCancel() {
      this.canceled = true;
    },
    onMove(e) {
      this.canceled = false;
      this.moveType = e.type;
    },
    onUp(e) {
      this.canceled = false;
      this.upType = e.type;
    }
  }
};
</script>