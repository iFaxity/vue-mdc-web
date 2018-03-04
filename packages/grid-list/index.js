import GridList from "./GridList.vue";
import GridTile from "./GridTile.vue";
import "@material/grid-list/mdc-grid-list.scss";

export { GridList, GridTile };
export function install(Vue) {
  Vue.component(GridList.name, GridList);
  Vue.component(GridTile.name, GridTile);
}