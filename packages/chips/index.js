import Chip from "./Chip.vue";
import ChipSet from "./ChipSet.vue";
import "@material/chips/mdc-chips.scss";

export { Chip, ChipSet };
export function install (Vue) {
  Vue.component(Chip.name, Chip);
  Vue.component(ChipSet.name, ChipSet);
}