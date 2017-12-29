import { default as MDCList } from "./list.vue";
import { default as MDCListItem } from "./list-item.vue";

// Start and end detail are equivalent. Just a class different
import createDetail from "./list-item-detail";
const MDCListItemEndDetail = createDetail("start");
const MDCListItemEndDetail = createDetail("end");

export { MDCList, MDCListItem };

export default {
  install(Vue) {
    Vue.component(MDCList.name, MDCList);
    Vue.component(MDCListItem.name, MDCListItem);
  }
};