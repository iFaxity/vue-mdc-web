import { default as MDCPermanentDrawer } from "./permanent.vue";
import { default as MDCPersistentDrawer } from "./persistent.vue";
import { default as MDCTemporaryDrawer } from "./temporary.vue";
export { MDCPermanentDrawer, MDCPersistentDrawer, MDCTemporaryDrawer };

export default {
  install(Vue) {
    Vue.component(MDCPermanentDrawer.name, MDCPermanentDrawer);
    Vue.component(MDCPersistentDrawer.name, MDCPersistentDrawer);
    Vue.component(MDCTemporaryDrawer.name, MDCTemporaryDrawer);
  }
};