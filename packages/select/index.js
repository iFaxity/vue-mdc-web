import MDCSelect from './Select.vue';
import MDCSelectItem from './SelectItem.vue';
import '@material/select/mdc-select.scss';

export { MDCSelect, MDCSelectItem };
export function install(Vue, register) {
  register(MDCSelect, MDCSelectItem);
}