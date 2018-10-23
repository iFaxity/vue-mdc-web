<template lang="pug">
mdc-app(flip, align-start)
  mdc-toolbar(slot="toolbar")
    mdc-toolbar-row
      mdc-toolbar-section(align-start)
        mdc-toolbar-menu-icon(@click="toggleDrawer")
        mdc-toolbar-title {{ title }}

  mdc-drawer(ref="drawer", slot="drawer", :type="drawer", :open="drawerOpen", header="Components")
    mdc-drawer-item(to="/", exact, text="Home")
    mdc-drawer-divider
    mdc-drawer-item(v-for="n of routes", :key="n", :to="'/demo/' + kebab(n)", :text="n")

  // all the views have main as mounting point
  router-view
</template>

<script>

export default {
  name: 'AppRoot',
  data() {
    return {
      title: 'MDC Vue Demo',
      drawer: 'persistent',
      drawerOpen: false,
      routes: [
        'App',
        'Button',
        'Card',
        'Checkbox',
        'Chips',
        'Dialog',
        'Drawer',
        'Elevation',
        'Fab',
        'FormField',
        'GridList',
        'IconToggle',
        'LayoutGrid',
        'LinearProgress',
        'List',
        'Menu',
        'Radio',
        'Ripple',
        'Select',
        'Slider',
        'Snackbar',
        'Switch',
        'Tabs',
        'Textfield',
        'Toolbar',
        'Typography'
      ]
    };
  },

  mounted() {
    const isMobile = () => document.documentElement.clientWidth < 720;
    if(isMobile()) {
      this.drawer = 'temporary';
    }

    window.addEventListener('resize', () => {
      const mobile = isMobile();
      this.drawer = mobile ? 'temporary' : 'persistent';
      this.drawerOpen = !mobile;
    });
    this.$state.$on('demoRouted', title => {
      this.title = `MDC ${title}`;
    })
  },
  beforeDestroy() {
    this.$state.$off('demoRouted');
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
      // Trigger resize on toggle
      this.$refs.drawer.toggle(true);
    }
  }
};
</script>