import MDCCard from './Card.vue';
import MDCCardActions from './CardActions.vue';
import MDCCardIcon from './CardIcon.vue';
import MDCCardMedia from './CardMedia.vue';
import '@material/card/mdc-card.scss';

export { MDCCard, MDCCardActions, MDCCardIcon, MDCCardMedia };
export function install(Vue, register) {
  register(MDCCard, MDCCardActions, MDCCardIcon, MDCCardMedia);
}

