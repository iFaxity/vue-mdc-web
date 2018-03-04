import LayoutGrid from "./LayoutGrid.vue";
import LayoutCell from "./LayoutCell.vue";
import LayoutInner from "./LayoutInner.vue";
import "@material/layout-grid/mdc-layout-grid.scss";

export { LayoutGrid, LayoutCell, LayoutInner };
export function install(Vue) {
  Vue.component(LayoutGrid.name, LayoutGrid);
  Vue.component(LayoutCell.name, LayoutCell);
  Vue.component(LayoutInner.name, LayoutInner);
}