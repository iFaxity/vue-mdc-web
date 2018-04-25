import MDCToolbar from './Toolbar.vue';
import MDCToolbarRow from './ToolbarRow.vue';
import MDCToolbarSection from './ToolbarSection.vue';
import MDCToolbarTitle from './ToolbarTitle.vue';
import MDCToolbarIcon from './ToolbarIcon.vue';
import MDCToolbarMenuIcon from './ToolbarMenuIcon.vue';
import '@material/toolbar/mdc-toolbar.scss';

export { MDCToolbar, MDCToolbarRow, MDCToolbarSection, MDCToolbarTitle, MDCToolbarIcon, MDCToolbarMenuIcon };
export function install(Vue, register) {
  register(MDCToolbar, MDCToolbarRow, MDCToolbarSection, MDCToolbarTitle, MDCToolbarIcon, MDCToolbarMenuIcon);
}