import { default as Toolbar } from "./toolbar.vue";
import { default as ToolbarRow } from "./row.vue";
import { default as ToolbarSection } from "./section.vue";
import { default as ToolbarTitle } from "./title.vue";
import { default as ToolbarIcon } from "./icon.vue";
import { default as ToolbarMenuIcon } from "./menu-icon.vue";
import "@material/toolbar/mdc-toolbar.scss";

export { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle, ToolbarIcon, ToolbarMenuIcon };
export function install(Vue) {
  Vue.component(Toolbar.name, Toolbar);
  Vue.component(ToolbarRow.name, ToolbarRow);
  Vue.component(ToolbarSection.name, ToolbarSection);
  Vue.component(ToolbarTitle.name, ToolbarTitle);
  Vue.component(ToolbarIcon.name, ToolbarIcon);
  Vue.component(ToolbarMenuIcon.name, ToolbarMenuIcon);
}