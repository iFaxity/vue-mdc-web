import List from "./List.vue";
import ListItem from "./ListItem.vue";
import ListDivider from "./ListDivider.vue";
import ListItemGraphic from "./ListItemGraphic.vue";
import ListItemMeta from "./ListItemMeta.vue";
// List groups
import ListGroup from "./group/ListGroup.vue";
import ListGroupDivider from "./group/ListGroupDivider.vue";
import ListGroupSubheader from "./group/ListGroupSubheader.vue";
import "@material/list/mdc-list.scss";

export { List, ListItem, ListDivider, ListItemGraphic, ListItemMeta, ListGroup, ListGroupDivider, ListGroupSubheader };
export function install(Vue, register) {
  register(List, ListItem, ListDivider, ListItemGraphic, ListItemMeta,
    ListGroup, ListGroupDivider, ListGroupSubheader);
}