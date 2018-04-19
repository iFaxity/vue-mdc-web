import Card from "./Card.vue";
import CardActions from "./CardActions.vue";
import CardIcon from "./CardIcon.vue";
import CardMedia from "./CardMedia.vue";
import "@material/card/mdc-card.scss";

export { Card, CardActions, CardIcon, CardMedia };
export function install(Vue, register) {
  register(Card, CardActions, CardIcon, CardMedia);
}

