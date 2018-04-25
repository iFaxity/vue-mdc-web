import MDCImageList from './ImageList.vue';
import '@material/image-list/image-list.scss';

export { MDCImageList };
export function install(Vue, register) {
  register(MDCImageList);
}