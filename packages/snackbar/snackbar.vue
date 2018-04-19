<template lang="pug">
.mdc-snackbar(:class="cssClasses", aria-live="assertive", aria-atomic="true", :aria-hidden="hidden && 'true'")
  .mdc-snackbar__text {{messageText}}
  .mdc-snackbar__action__wrapper
    button.mdc-snackbar__action-button(ref="actionButton", type="button", :aria-hidden="actionHidden && 'true'") {{actionText}}
</template>

<script>
import Foundation from "@material/snackbar/foundation";
import { getCorrectEventName } from "@material/animation";

const transitionend = getCorrectEventName(window, "transitionend");
export default {
  name: "MDCSnackbar",
  props: {
    alignStart: Boolean,
    dismissesOnAction: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    dismissesOnAction(value) {
      this.foundation.setDismissOnAction(value);
    }
  },
  data() {
    return { messageText: null, actionText: null, hidden: true, actionHidden: true };
  },
  mounted() {
    const { $el } = this;
    const { actionButton } = this.$refs;

    this.foundation = new Foundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      setAriaHidden: () => {
        this.hidden = true;
      },
      unsetAriaHidden: () => {
        this.hidden = false;
      },
      setActionAriaHidden: () => {
        this.actionHidden = true;
      },
      unsetActionAriaHidden: () => {
        this.actionHidden = false;
      },
      setActionText: text => {
        this.actionText = text;
      },
      setMessageText: text => {
        this.messageText = text;
      },
      setFocus: () => actionButton.focus(),
      visibilityIsHidden: () => document.hidden,
      // Interactions
      registerCapturedBlurHandler: handler => actionButton.addEventListener("blur", handler, true),
      deregisterCapturedBlurHandler: handler => actionButton.removeEventListener("blur", handler, true),
      registerVisibilityChangeHandler: handler => document.addEventListener("visibilitychange", handler),
      deregisterVisibilityChangeHandler: handler => document.removeEventListener("visibilitychange", handler),
      registerCapturedInteractionHandler: (evt, handler) => document.body.addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) => document.body.removeEventListener(evt, handler, true),
      registerActionClickHandler: handler => actionButton.addEventListener("click", handler),
      deregisterActionClickHandler: handler => actionButton.removeEventListener("click", handler),
      registerTransitionEndHandler: handler => $el.addEventListener(transitionend, handler),
      deregisterTransitionEndHandler: handler => $el.removeEventListener(transitionend, handler),
      // Events
      notifyShow: () => this.$emit("show"),
      notifyHide: () => this.$emit("hide"),
    });
    this.foundation.init();

    this.foundation.setDismissOnAction(this.dismissesOnAction);
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  computed: {
    cssClasses() {
      return {
        "mdc-snackbar--align-start": this.alignStart
      };
    }
  },
  methods: {
    show(data) {
      this.foundation.show(data);
    }
  }
};
</script>