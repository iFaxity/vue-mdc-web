<template lang="pug">
mdc-app(flip)
  mdc-toolbar(slot="toolbar")
    mdc-toolbar-row
      mdc-toolbar-section(align-start)
        mdc-toolbar-menu-icon(@click="toggleDrawer")
        mdc-toolbar-title MDC Vue Demo

  mdc-drawer(ref="drawer", slot="drawer", :type="drawer", :open="drawerOpen", header="Components")
    mdc-drawer-item(to="/", exact, text="Home")
    mdc-drawer-divider
    mdc-drawer-item(v-for="n of routes", :key="n", :to="'/demo/' + kebab(n)", :text="n")

  // all the views have main as mounting point
  router-view
</template>

<script>
export default {
  name: "AppRoot",
  data() {
    return {
      drawer: "persistent",
      drawerOpen: false,
      routes: [
        "App",
        "Button",
        "Card",
        "Checkbox",
        "Dialog",
        "Drawer",
        "Elevation",
        "Fab",
        "FormField",
        "GridList",
        "IconToggle",
        "LayoutGrid",
        "LinearProgress",
        "List",
        "Menu",
        "Radio",
        "Ripple",
        "Select",
        "Slider",
        "Snackbar",
        "Switch",
        "Tabs",
        "Textfield",
        "Toolbar",
        "Typography"
      ]
    };
  },

  mounted() {
    const isMobile = () => document.documentElement.clientWidth < 720;
    if(isMobile()) {
      this.drawer = "temporary";
    }

    window.addEventListener("resize", () => {
      const mobile = isMobile();
      this.drawer = mobile ? "temporary" : "persistent";
      this.drawerOpen = !mobile;
    });
  },

  methods: {
    kebab(str) {
      const res = str.replace(/([a-z][A-Z])/g, function(match) {
        const c1 = match.substr(0, 1);
        const c2 = match.substr(1, 1).toLowerCase();
        return `${c1}-${c2}`;
      });
      return res.toLowerCase();
    },
    toggleDrawer() {
      this.$refs.drawer.toggle();

      // Trigger resize on toggle
      let event;
      try {
        event = new Event("resize");
      } catch(ex) {
        event = document.createEvent("UIEvents");
        event.initUIEvent("resize", true, false, window, 0);
      }
      window.dispatchEvent(event);
    }
  }
};
</script>