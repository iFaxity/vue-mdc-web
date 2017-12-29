<template lang="pug">
nav.mdc-tab-bar(:class=`cssClasses` @click="click")
  slot
  span.mdc-tab-bar__indicator(ref="indicator", :style="getIndicatorStyle")
</template>

<script>
export default {
  name: "MdcTabBar",
  props: {
    icons: Boolean,
    iconsWithText: Boolean,
    primary: Boolean,
    secondary: Boolean
  },
  data() {
    return { index: -1, tabs: [] };
  },
  mounted() {
    this.tabs = this.$el.querySelectorAll(".mdc-tab");
  },
  computed: {
    indicatorStyle() {
      const { $el, index } = this;

      // TODO
      if(this.index !== -1) {
        const child = $el.children[index];
        const { left, width } = child.getBoundingClientRect();

        const x = left * index;
        const scale = width / $el.offsetWidth;
        const transform = `translateX(${left}px)`;

        return `transform: ${transform}; visibility: visible;`;
      }
      return "transition: none; visibility: none;";
    },
    cssClasses() {
      return {
        "mdc-tab-bar--upgraded": true ,
        "mdc-tab-bar--icon-tabs": this.icons,
        "mdc-tab-bar--icons-with-text": this.iconsWithText,
        "mdc-tab-bar--indicator-primary": this.primary,
        "mdc-tab-bar--indicator-accent": this.secondary
      };
    }
  },
  methods: {
    click(e) {
      if(e.target.matches(".mdc-tab")) {
        
      }
    }
  }
};
</script>