import MDCList from "./List.vue";
import MDCListItem from "./ListItem.vue";
import MDCListDivider from "./ListDivider.vue";
import MDCListItemGraphic from "./ListItemGraphic.vue";
import MDCListItemMeta from "./ListItemMeta.vue";
// List groups
import MDCListGroup from "./group/ListGroup.vue";
import MDCListGroupDivider from "./group/ListGroupDivider.vue";
import MDCListGroupSubheader from "./group/ListGroupSubheader.vue";
import "@material/list/mdc-list.scss";

export { MDCList, MDCListItem, MDCListDivider, MDCListItemGraphic, MDCListItemMeta, MDCListGroup, MDCListGroupDivider, MDCListGroupSubheader };
export function install(Vue, register) {
  register(MDCList, MDCListItem, MDCListDivider, MDCListItemGraphic, MDCListItemMeta,
    MDCListGroup, MDCListGroupDivider, MDCListGroupSubheader);
}