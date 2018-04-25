<template lang="pug">
.mdc-grid-list
  ul.mdc-grid-list__tiles(ref="tiles")
    slot
</template>

<script>
import Foundation from '@material/grid-list/foundation';
const RATIOS = ['1x1', '16x9', '2x3', '3x2', '4x3', '3x4'];

export default {
  name: 'MDCGridList',
  props: {
    headerCaption: Boolean,
    twoline: Boolean,
    iconAlignEnd: Boolean,
    iconAlignStart: Boolean,
    thinGutter: Boolean,
    ratio: {
      type: String,
      validator: value => RATIOS.includes(value)
    }
  },
  mounted() {
    const { $el } = this;
    const { tiles } = this.$refs;

    this.foundation = new Foundation({
      getOffsetWidth: () => $el.offsetWidth,
      getNumberOfTiles: () => tiles.children.length,
      getOffsetWidthForTileAtIndex: index => tiles.children[index].offsetWidth,
      setStyleForTilesElement: (prop, value) => tiles.style[prop] = value,
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler)
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  computed: {
    cssClasses() {
      const classes = {
        'mdc-grid-list--tile-gutter-1': this.thinGutter,
        'mdc-grid-list--header-caption': this.captions,
        'mdc-grid-list--twoline-caption': this.twoline,
        'mdc-grid-list--with-icon-align-start': this.iconAlignStart,
        'mdc-grid-list--with-icon-align-end': this.iconAlignEnd
      };

      if(this.aspect) {
        classes[`mdc-grid-list--tile-aspect-${this.ratio}`] = true;
      }
      return classes;
    }
  }
};
</script>