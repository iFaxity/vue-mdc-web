import Toolbar from "./Toolbar.vue";
import ToolbarRow from "./ToolbarRow.vue";
import ToolbarSection from "./ToolbarSection.vue";
import ToolbarTitle from "./ToolbarTitle.vue";
import ToolbarIcon from "./ToolbarIcon.vue";
import ToolbarMenuIcon from "./ToolbarMenuIcon.vue";
import "@material/toolbar/mdc-toolbar.scss";

export { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarIcon, ToolbarMenuIcon };
export function install(Vue, register) {
  register(Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarIcon, ToolbarMenuIcon);
}