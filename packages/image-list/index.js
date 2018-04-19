import ImageList from "./ImageList.vue";
import "@material/image-list/image-list.scss";

export { ImageList };
export function install(Vue, register) {
  register(ImageList);
}