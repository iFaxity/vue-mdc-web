import MDCGridList from './GridList.vue';
import MDCGridTile from './GridTile.vue';
import '@material/grid-list/mdc-grid-list.scss';

export { MDCGridList, MDCGridTile };
export function install(Vue, register) {
  register(MDCGridList, MDCGridTile);
}