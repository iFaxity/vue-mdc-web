import MDCChip from "./Chip.vue";
import MDCChipSet from "./ChipSet.vue";
import "@material/chips/mdc-chips.scss";

export { MDCChip, MDCChipSet };
export function install (Vue, register) {
  register(MDCChip, MDCChipSet);
}