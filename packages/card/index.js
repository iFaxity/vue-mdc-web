import Card from "./card.vue";
import "@material/card/mdc-card.scss";

export { Card };
export function install (Vue) {
  Vue.component(Card.name, Card);
}

