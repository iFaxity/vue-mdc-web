import { default as MDCCard } from "./card.vue";
import "@material/card/mdc-card.scss";

export { MDCCard };
export function install (Vue) {
  Vue.component(MDCCard.name, MDCCard);
}

