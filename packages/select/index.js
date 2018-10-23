import MDCSelect from './Select.vue';
import MDCSelectItem from './SelectItem.vue';
import MDCSelectItemGroup from './SelectItemGroup.vue';
import '@material/select/mdc-select.scss';

export { MDCSelect, MDCSelectItem, MDCSelectItemGroup };
export function install(Vue, register) {
  register(MDCSelect, MDCSelectItem, MDCSelectItemGroup);
}