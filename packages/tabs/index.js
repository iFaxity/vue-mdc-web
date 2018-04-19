import Tab  from "./Tab.vue";
import TabBar from "./tabs";
import "@material/tabs/mdc-tabs.scss";

export { Tab, TabBar };
export function install(Vue, register) {
  register(Tab);
  // Register TabBar like this for now.
  Vue.component("mdc-tab-bar", TabBar);
}