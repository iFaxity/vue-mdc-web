import MDCTab  from "./Tab.vue";
import MDCTabBar from "./tabs";
import "@material/tabs/mdc-tabs.scss";

export { MDCTab, MDCTabBar };
export function install(Vue, register) {
  register(MDCTab);
  // Register TabBar like this for now.
  Vue.component("mdc-tab-bar", MDCTabBar);
}