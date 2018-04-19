import Toolbar from "./Toolbar.vue";
import ToolbarRow from "./ToolbarRow.vue";
import ToolbarSection from "./ToolbarSection.vue";
import ToolbarTitle from "./ToolbarTitle.vue";
import ToolbarIcon from "./ToolbarIcon.vue";
import ToolbarMenuIcon from "./ToolbarMenuIcon.vue";
import "@material/toolbar/mdc-toolbar.scss";

export { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarIcon, ToolbarMenuIcon };
export function install(Vue, register) {
  Vue.component(Toolbar.name, Toolbar);
  Vue.component(ToolbarRow.name, ToolbarRow);
  Vue.component(ToolbarSection.name, ToolbarSection);
  Vue.component(ToolbarTitle.name, ToolbarTitle);
  Vue.component(ToolbarIcon.name, ToolbarIcon);
  Vue.component(ToolbarMenuIcon.name, ToolbarMenuIcon);
}