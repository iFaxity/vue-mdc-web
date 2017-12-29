import { default as MDCTab } from "./tab-bar.vue";
import { default as MDCTabBar } from "./tab-bar.vue";
import { default as MDCTabBarScroller } from "./tab-bar.vue";
export { MDCTab, MDCTabBar, MDCTabBarScroller };

export default {
  install(Vue) {
    Vue.component(MDCTab.name, MDCTab);
    Vue.component(MDCTabBar.name, MDCTabBar);
    Vue.component(MDCTabBarScroller.name, MDCTabBarScroller);
  }
};