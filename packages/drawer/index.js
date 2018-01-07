import PermanentDrawer from "./permanent.vue";
import PersistentDrawer from "./persistent.vue";
import TemporaryDrawer from "./temporary.vue";
import "@material/drawer/mdc-drawer.scss";

export { PermanentDrawer, PersistentDrawer, TemporaryDrawer };
export function install(Vue) {
  Vue.component(PermanentDrawer.name, PermanentDrawer);
  Vue.component(PersistentDrawer.name, PersistentDrawer);
  Vue.component(TemporaryDrawer.name, TemporaryDrawer);
}