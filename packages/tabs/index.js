import Tab  from "./Tab.vue";
import TabBar from "./tabs";
import "@material/tabs/mdc-tabs.scss";

export { Tab, TabBar };
export function install(Vue) {
  Vue.component(Tab.name, Tab);
  Vue.component("mdc-tab-bar", TabBar);
}