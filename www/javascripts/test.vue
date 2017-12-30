<template lang="pug">
#app
  mdc-toolbar(fixed="lastrow" waterfall flexible)
    mdc-toolbar-row
      mdc-toolbar-section(align-start)
        mdc-toolbar-menu-icon(@click=`$refs.drawer.open()`)
        mdc-toolbar-title Material Components In Vuejs

    mdc-toolbar-row
      mdc-toolbar-section(align-end)
        mdc-toolbar-icon(aria-label="Download" alt="Download") file_download    
        mdc-toolbar-icon(aria-label="Print this page" alt="Print this page") print
        mdc-toolbar-icon(aria-label="Bookmark this page" alt="Bookmark this page") bookmark
  // Main content
  main(ref="main" style="height: 100vh")
    // Button
    h2 Buttons
    mdc-button Click me
    mdc-button(icon="accessibility" raised) Icon Button
    mdc-button(raised) Raised button

    //mdc-fab(icon="add" label="Add")
    //mdc-icon-toggle(:icon=`{on: "favorite", off: "favorite_border"}`, :label=`{on: "Remove from favorites", off: "Add to favorites"}`)

    // Dialog
    h2 Dialog
    mdc-button(raised @click="openDialog") Show Dialog
    p Result: {{dialogResult}}
    mdc-dialog(ref="dialog" @action="dialogAction")
      mdc-dialog-title(slot="header") Test dialog
      | This is just a test dialog click accept or decline to close the window

    //h2 Slider
      mdc-slider(v-model="sliderValue" discrete :min="0" :max="50" :step="1" @input="onSliderInput")
      p Slider@change {{sliderValue}} Slider@input {{sliderInput}}

    h2 Checkbox
    mdc-checkbox(indeterminate v-model="checked")
    p Checked: {{checked}}

    //h2 Textfield
    //mdc-textfield(v-model="myName" box icon="mail" click-icon trailing-icon pattern="[A-Za-z]{5,10}") Enter your name
      mdc-textfield(v-model="myName" box pattern="[A-Za-z]{5,10}") Name
      mdc-textfield-helptext(validation) Enter a name between 5 and 10 characters

    //h2 Snackbar
      mdc-button(@click="showSnack" raised) Show snack # {{snackCount}}
      mdc-snackbar(ref="snackbar" align-start)

</template>

<script>

export default {
  name: "Test",
  data() {
    return { 
      dialogResult: "<none>", sliderValue: 25, sliderInput: 0, myName: "Cooldude",
      checked: false, snackCount: 1
    };
  },
  methods: {
    openDialog() {
      this.$refs.dialog.open();
    },
    dialogAction(action) {
      this.dialogResult = action;
    },
    onSliderInput(value) {
      this.sliderInput = value;
    },
    showSnack() {
      const count = this.snackCount++;
      const snack = {
        message: `Hello i'm #${count}`,
        multiline: count % 2 === 0,
        actionOnBottom: count % 4 === 0,
        action: item => console.log(item.message),
        actionText: "Hide"
      };
      this.$refs.snackbar.show(snack);
    }
  }
};
</script>