import Card from "./Card.vue";
import CardActions from "./CardActions.vue";
import CardMedia from "./CardMedia.vue";
import "@material/card/mdc-card.scss";

export { Card, CardActions, CardMedia };
export function install (Vue) {
  Vue.component(Card.name, Card);
  Vue.component(CardActions.name, CardActions);
  Vue.component(CardMedia.name, CardMedia);
}

