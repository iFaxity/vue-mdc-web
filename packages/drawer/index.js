import Drawer from "./drawer";
import PermanentDrawer from "./PermanentDrawer.vue";
import PersistentDrawer from "./PersistentDrawer.vue";
import TemporaryDrawer from "./TemporaryDrawer.vue";
import DrawerItem from "./DrawerItem.vue";
import DrawerDivider from "./DrawerDivider.vue";
import "@material/drawer/mdc-drawer.scss";

export { PermanentDrawer, PersistentDrawer, TemporaryDrawer, DrawerItem, DrawerDivider };
export function install(Vue, register) {
  register(Drawer, PermanentDrawer, PersistentDrawer,
    TemporaryDrawer, DrawerItem, DrawerDivider);
}