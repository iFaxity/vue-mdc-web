import MDCLayoutGrid from './LayoutGrid.vue';
import MDCLayoutCell from './LayoutCell.vue';
import MDCLayoutInner from './LayoutInner.vue';
import '@material/layout-grid/mdc-layout-grid.scss';

export { MDCLayoutGrid, MDCLayoutCell, MDCLayoutInner };
export function install(Vue, register) {
  register(MDCLayoutGrid, MDCLayoutCell, MDCLayoutInner);
}