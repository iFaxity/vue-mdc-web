import MDCDrawer from './drawer';
import MDCPermanentDrawer from './PermanentDrawer.vue';
import MDCPersistentDrawer from './PersistentDrawer.vue';
import MDCTemporaryDrawer from './TemporaryDrawer.vue';
import MDCDrawerItem from './DrawerItem.vue';
import MDCDrawerDivider from './DrawerDivider.vue';
import '@material/drawer/mdc-drawer.scss';

export { MDCPermanentDrawer, MDCPersistentDrawer, MDCTemporaryDrawer, MDCDrawerItem, MDCDrawerDivider };
export function install(Vue, register) {
  register(MDCDrawer, MDCPermanentDrawer, MDCPersistentDrawer,
    MDCTemporaryDrawer, MDCDrawerItem, MDCDrawerDivider);
}