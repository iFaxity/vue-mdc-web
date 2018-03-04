<template lang="pug">
mdc-app(flip, align-start)
  mdc-toolbar(slot="toolbar")
    mdc-toolbar-row
      mdc-toolbar-section(align-start)
        mdc-toolbar-icon(icon="keyboard_backspace")
        mdc-toolbar-title Material Components In Vuejs

      mdc-toolbar-section(align-end)
        mdc-toolbar-icon(icon="file_download", label="Download") 
        mdc-toolbar-icon(icon="print", label="Print this page")
        mdc-toolbar-icon(icon="bookmark", label="Bookmark this page")

  mdc-permanent-drawer(slot="drawer", ref="drawer", spacer)
    h2(slot="header") Hello there friends
    mdc-drawer-item(text="Inbox")
      mdc-list-item-graphic(slot="graphic", icon="inbox")
    mdc-drawer-item(text="Star")
      mdc-list-item-graphic(slot="graphic", icon="star")
    mdc-drawer-item(text="Sent mail")
      mdc-list-item-graphic(slot="graphic", icon="send")
    mdc-drawer-item(text="Drafts")
      mdc-list-item-graphic(slot="graphic", icon="drafts")
    mdc-drawer-divider
    mdc-drawer-item(text="All mail")
      mdc-list-item-graphic(slot="graphic", icon="email")
    mdc-drawer-item(text="Trash")
      mdc-list-item-graphic(slot="graphic", icon="delete")
    mdc-drawer-item(text="Spam")
      mdc-list-item-graphic(slot="graphic", icon="report")  
  
  main
    // Button
    h2 Buttons
    mdc-button Click me
    mdc-button(icon="accessibility", raised) Icon Button
    mdc-button(raised) Raised button

    mdc-fab(icon="add", label="Add")
    mdc-icon-toggle(:on=`{content: "favorite", label: "Remove from favorites"}`, :off=`{content: "favorite_border", label: "Add to favorites"}`)

    h2 Chips
    mdc-chip-set
      mdc-chip(action="wb_sunny", text="Turn on lights")
      mdc-chip(action="bookmark", text="Bookmark")
      mdc-chip(action="alarm", text="Set alarm")
      mdc-chip(action="directions", text="Get directions")

    // Dialog
    h2 Dialog
    mdc-button(raised, @click="openDialog") Show Dialog
    p Result: {{dialogResult}}
    mdc-dialog(ref="dialog", title="Test Dialog", @action="dialogAction")
      | This is just a test dialog click accept or decline to close the window

    //h2 Slider
    //mdc-slider(v-model="sliderValue", min="0", max="50", @input="onSliderInput")
    //p Slider@change {{sliderValue}} Slider@input {{sliderInput}}

    h2 Linear Progress
    mdc-linear-progress(v-model="linearProgress", :buffer="linearBuffer")
    p Progress: {{linearProgress}}; Buffer: {{linearBuffer}}
    mdc-button(raised, @click="randomProgress") Change progress

    h2 Form fields
    mdc-form-field(:label="`Checked: ${checked}`")
      mdc-checkbox(indeterminate, v-model="checked")

    mdc-form-field(label="Switch")
      mdc-switch
    mdc-form-field(label="Apple")
      mdc-radio(v-model="radio", value="apple")
    mdc-form-field(label="Banana")  
      mdc-radio(v-model="radio", value="banana")

    h2 Textfield
    mdc-textfield(v-model="myName", box, trailing-icon="mail", pattern="[A-Za-z]{5,10}", label="Enter your name")

    mdc-textfield(v-model="myName", leading-icon="lock", pattern="[A-Za-z]{5,10}", label="Name", @icon="console.log('kek')")
    mdc-textfield-helpertext(validation) Enter a name between 5 and 10 characters

    mdc-textfield(outlined, label="Outlined")
    mdc-textfield(textarea, value="kek", label="kekks", rows="8", cols="40")

    h2 Menu
    div
      mdc-button(@click="$refs.menu.show()") Open menu
      mdc-menu(ref="menu", anchor, @selected="menuSelected")
        mdc-menu-item(text="Hello")
        mdc-menu-item(text="Kek")
        mdc-menu-item(text="Lels")

    h2 Select (value: {{selectValue}})
    mdc-select(label="Fruits?" v-model="selectValue")
      mdc-select-item(value="banana", label="Banana")
      mdc-select-item(label="Kiwi (bleh)", disabled)
      mdc-select-item(label="Orange")

    h2 Snackbar
    mdc-button(raised, @click="showSnack") Show snack # {{snackCount}}
    mdc-snackbar(ref="snackbar", align-start)

    h2 Tabs
    mdc-tab-bar
      mdc-tab(link="#kek", text="Kek")
      mdc-tab(link="#lel", text="Lel")
      mdc-tab(link="#batkek", text="Batkek")

    h2 Layout Grid
    mdc-layout-grid
      mdc-layout-cell 4
      mdc-layout-cell 4
      mdc-layout-cell 4

    mdc-layout-grid
      mdc-layout-cell(span="1") 1
      mdc-layout-cell(span="1") 1
      mdc-layout-cell(span="1") 1
      mdc-layout-cell(span="1") 1
      mdc-layout-cell(span="1") 1
      mdc-layout-cell(span="1") 1
      mdc-layout-cell(span="1") 1
      mdc-layout-cell(span="1") 1
      mdc-layout-cell(span="1") 1
      mdc-layout-cell(span="1") 1
      mdc-layout-cell(span="1") 1
      mdc-layout-cell(span="1") 1
</template>

<script>
/*
#app(style="display: flex; flex-direction: column; padding: 0; margin: 0; box-sizing: border-box; min-height: 100%;")
  mdc-toolbar(fixed)
    mdc-toolbar-row
      mdc-toolbar-section(align-start)
        mdc-toolbar-menu-icon(@click="$refs.drawer.open()")
        mdc-toolbar-title Material Components In Vuejs

      mdc-toolbar-section(align-end)
        mdc-toolbar-icon(icon="file_download", label="Download") 
        mdc-toolbar-icon(icon="print", label="Print this page")
        mdc-toolbar-icon(icon="bookmark", label="Bookmark this page")

  .mdc-toolbar-fixed-adjust(style="display: flex; flex: 1 1 auto; height: 100%; box-sizing: border-box;")
    mdc-permanent-drawer(spacer)
      mdc-drawer-item(text="Inbox")
        mdc-list-item-graphic(slot="graphic", icon="inbox")
      mdc-drawer-item(text="Star")
        mdc-list-item-graphic(slot="graphic", icon="star")
      mdc-drawer-item(text="Sent mail")
        mdc-list-item-graphic(slot="graphic", icon="send")
      mdc-drawer-item(text="Drafts")
        mdc-list-item-graphic(slot="graphic", icon="drafts")
      mdc-drawer-divider
      mdc-drawer-item(text="All mail")
        mdc-list-item-graphic(slot="graphic", icon="email")
      mdc-drawer-item(text="Trash")
        mdc-list-item-graphic(slot="graphic", icon="delete")
      mdc-drawer-item(text="Spam")
        mdc-list-item-graphic(slot="graphic", icon="report")      
    // Main content
    main
      // Button
      h2 Buttons
      mdc-button Click me
      mdc-button(icon="accessibility", raised) Icon Button
      mdc-button(raised) Raised button

      mdc-fab(icon="add", label="Add")
      mdc-icon-toggle(:on=`{content: "favorite", label: "Remove from favorites"}`, :off=`{content: "favorite_border", label: "Add to favorites"}`)

      // Dialog
      h2 Dialog
      mdc-button(raised, @click="openDialog") Show Dialog
      p Result: {{dialogResult}}
      mdc-dialog(ref="dialog", @action="dialogAction")
        mdc-dialog-title(slot="header") Test dialog
        | This is just a test dialog click accept or decline to close the window

      h2 Slider
      mdc-slider(v-model="sliderValue", min="0", max="50", @input="onSliderInput")
      p Slider@change {{sliderValue}} Slider@input {{sliderInput}}

      h2 Linear Progress
      mdc-linear-progress(v-model="linearProgress", :buffer="linearBuffer")
      p Progress: {{linearProgress}}; Buffer: {{linearBuffer}}
      mdc-button(raised, @click="randomProgress") Change progress

      h2 Form fields
      mdc-form-field(:label="`Checked: ${checked}`")
        mdc-checkbox(indeterminate, v-model="checked")

      mdc-form-field(label="Switch")
        mdc-switch
      mdc-form-field(label="Apple")
        mdc-radio(v-model="radio", value="apple")
      mdc-form-field(label="Banana")  
        mdc-radio(v-model="radio", value="banana")

      h2 Textfield
      mdc-textfield(v-model="myName", box, icon="mail", click-icon, trailing-icon, pattern="[A-Za-z]{5,10}") Enter your name
      mdc-textfield(v-model="myName", pattern="[A-Za-z]{5,10}") Name
      mdc-textfield-helpertext(validation) Enter a name between 5 and 10 characters

      h2 Menu
      div
        mdc-button(@click="$refs.menu.show()") Open menu
        mdc-menu(ref="menu", anchor, @selected="menuSelected")
          mdc-menu-item(text="Hello")
          mdc-menu-item(text="Kek")
          mdc-menu-item(text="Lels")

      h2 Select (value: {{selectValue}})
      mdc-select(label="Fruits?" v-model="selectValue")
        mdc-select-item(value="banana", label="Banana")
        mdc-select-item(label="Kiwi (bleh)", disabled)
        mdc-select-item(label="Orange")

      h2 Snackbar
      mdc-button(raised, @click="showSnack") Show snack # {{snackCount}}
      mdc-snackbar(ref="snackbar", align-start)

      h2 Layout Grid
      mdc-layout-grid
        mdc-layout-cell 4
        mdc-layout-cell 4
        mdc-layout-cell 4

      mdc-layout-grid
        mdc-layout-cell(span="1") 1
        mdc-layout-cell(span="1") 1
        mdc-layout-cell(span="1") 1
        mdc-layout-cell(span="1") 1
        mdc-layout-cell(span="1") 1
        mdc-layout-cell(span="1") 1
        mdc-layout-cell(span="1") 1
        mdc-layout-cell(span="1") 1
        mdc-layout-cell(span="1") 1
        mdc-layout-cell(span="1") 1
        mdc-layout-cell(span="1") 1
        mdc-layout-cell(span="1") 1
*/

export default {
  name: "Test",
  data() {
    return { 
      dialogResult: "<none>", sliderValue: 25, sliderInput: 0, myName: "Cooldude",
      checked: false, snackCount: 1, radio: null,
      linearProgress: 50, linearBuffer: 0, selectValue: "Orange"
    };
  },
  methods: {
    menuSelected(index) {
      console.log(`Selected: ${index}`);
    },
    openDialog() {
      this.$refs.dialog.open();
    },
    dialogAction(action) {
      this.dialogResult = action;
    },
    onSliderInput(value) {
      this.sliderInput = value;
    },
    randomProgress() {
      const progress = Math.round(Math.random() * 10) / 10;
      this.linearProgress = progress;
      this.linearBuffer = Math.min(1, progress + 0.1);
    },
    showSnack() {
      const count = this.snackCount++;
      const snack = {
        message: `Hello i'm #${count}`,
        multiline: count % 2 === 0,
        actionOnBottom: count % 4 === 0,
        actionHandler: item => console.log(item.message),
        actionText: "Hide"
      };
      this.$refs.snackbar.show(snack);
    }
  }
};
</script>