
// Trigger resize on toggle
function triggerResize() {
  // Simple hack for triggering a resize to tell other elements to recalculate it's width/height.
  let event;
  try {
    event = new Event('resize');
  } catch(ex) {
    event = document.createEvent('UIEvents');
    event.initUIEvent('resize', true, false, window, 0);
  }
  window.dispatchEvent(event);
}

export default {
  props: {
    open: Boolean,
    spacer: Boolean,
    header: String,
  },
  methods: {
    toggle(emitResize = false) {
      if (this.foundation.isOpen()) {
        this.foundation.close();
      } else {
        this.foundation.open();
      }

      // Triggering a resize event after drawer changed state can help with the
      // resizing of the content if the content has 'flexed'.
      if(emitResize) {
        triggerResize();
      }
    }
  }
};