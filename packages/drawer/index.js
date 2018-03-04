import Drawer from "./drawer";
import PermanentDrawer from "./PermanentDrawer.vue";
import PersistentDrawer from "./PersistentDrawer.vue";
import TemporaryDrawer from "./TemporaryDrawer.vue";
import DrawerItem from "./DrawerItem.vue";
import DrawerDivider from "./DrawerDivider.vue";
import "@material/drawer/mdc-drawer.scss";

export { PermanentDrawer, PersistentDrawer, TemporaryDrawer, DrawerItem, DrawerDivider };
export function install(Vue) {
  Vue.component(Drawer.name, Drawer);
  Vue.component(PermanentDrawer.name, PermanentDrawer);
  Vue.component(PersistentDrawer.name, PersistentDrawer);
  Vue.component(TemporaryDrawer.name, TemporaryDrawer);
  Vue.component(DrawerItem.name, DrawerItem);
  Vue.component(DrawerDivider.name, DrawerDivider);
}