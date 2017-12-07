<template lang="pug">
header.mdc-toolbar(:class=`cssClasses`)
  slot
</template>

<script>
import { passiveOpts } from "../util";

// Taken from official MDC github
const MAX_TITLE_SIZE = 2.125;
const MIN_TITLE_SIZE = 1.25;
const TOOLBAR_ROW_HEIGHT = 64;
const TOOLBAR_ROW_MOBILE_HEIGHT = 56;
const TOOLBAR_MOBILE_BREAKPOINT = 600;
const DIFF_TITLE_SIZE = MAX_TITLE_SIZE - MIN_TITLE_SIZE;
// Class names
const MINIMIZED_CLASS = "mdc-toolbar--flexible-space-minimized";
const MAXIMISED_CLASS = "mdc-toolbar--flexible-space-maximized";
const FIXED_AT_LAST_ROW_CLASS = "mdc-toolbar--fixed-at-last-row";

// Helper function that don't need context
function clamp(min, max, value) {
  if(value < min) {
    return min;
  }
  return value > max ? max : value;
}
function removeStyle($el) {
  if($el) {
    $el.removeAttribute("style");
  }
}

export default {
  name: "MdcToolbar",
  props: {
    flexible: Boolean,
    waterfall: Boolean,
    fixed: {
      type: String,
      validator: value => value === "" || value === "lastrow"
    }
  },
  mounted() {
    // Bind events
    this.windowBind();
  },
  destroy() {
    this.windowUnbind(false);
  },
  data() {
    return {
      ratio: null,
      toolbarHeight: null,
      adjustFrame: 0,
      bound: false,
      fixedAtLastRow: false
    };
  },
  watch: {
    flexible(newVal, oldVal) {
      if(newValue && !this.bound) {
        this.windowBind();
      } else if(!newValue && this.bound) {
        this.windowBind();
      }
    },
    waterfall(newValue) {
      if(newValue && !this.bound) {
        this.windowBind();
      } else if(!newValue && this.bound) {
        this.windowBind();
      }
    }
  },
  computed: {
    cssClasses() {
      //TODO: minimize flexible and fixed to a string
      return {
        "mdc-toolbar--waterfall": this.waterfall,
        "mdc-toolbar--fixed": typeof this.fixed === "string",
        "mdc-toolbar--fixed-lastrow-only": this.fixed === "lastrow",
        "mdc-toolbar--flexible": this.flexible,
        "mdc-toolbar--flexible-default-behavior": this.flexible
      };
    },
    rowHeight() {
      return this.isMobile ? TOOLBAR_ROW_MOBILE_HEIGHT : TOOLBAR_ROW_HEIGHT;
    }
  },
  methods: {
    windowBind() {
      this.toolbarHeight = this.$el.clientHeight;
      if(typeof this.fixed === "string") {
        this.adjustSibling();
      }
      
      if(!this.bound && this.flexible || this.waterfall) {
        // Bind events
        window.addEventListener("scroll", this.windowScroll, passiveOpts());
        this.bound = true;

        if(this.flexible) {
          window.addEventListener("resize", this.windowResize);
          this.windowResize();
        }
      }
    },
    windowUnbind(clean = true) {
      if(!this.bound) return;
      window.removeEventListener("scroll", this.windowScroll, passiveOpts());
      window.removeEventListener("resize", this.windowResize);
      this.bound = false;

      if(clean) {
        // Clean styles
        const { $el } = this;
        removeStyle($el.querySelector(".mdc-toolbar__title"));
        removeStyle($el.querySelector(".mdc-toolbar__row"));
      }
    },

    // Window events
    windowScroll(e) {
      // Scroll and adjust if ratio changed
      const calc = this.calculate();
      if(this.ratio !== calc.ratio) {
        this.adjustHeight(calc);
      }

      if(this.fixed === "lastrow") {
        const height = this.toolbarHeight - calc.toolbarHeight;
        const y = clamp(0, calc.toolbarHeight, calc.scroll - height);
        this.$el.style.transform = `translateY(-${y}px)`;

        // Fix the box-shadow
        if(y === calc.toolbarHeight) {
          if(!this.fixedAtLastRow) {
            this.$el.classList.add(FIXED_AT_LAST_ROW_CLASS);
            this.fixedAtLastRow = true;
          }
        } else if(this.fixedAtLastRow) {
          this.$el.classList.remove(FIXED_AT_LAST_ROW_CLASS);
          this.fixedAtLastRow = false;
        }
      }
    },
    windowResize(e) {
      // Adjust toolbar height if window resized to mobile width
      const width = window.innerWidth || document.body.clientWidth;
      const isMobile = width < TOOLBAR_MOBILE_BREAKPOINT;

      if(this.isMobile !== isMobile) {
        this.isMobile = isMobile;
        this.adjustHeight();
      }
    },
    
    // Helper functions
    calculate() {
      const { rowHeight, toolbarHeight } = this;
      const diffHeight = toolbarHeight - rowHeight;
      const scroll = this.scrollTop();
      const ratio = clamp(0, 1, 1 - (scroll / diffHeight));

      return {
        ratio, scroll,
        fontSize: MIN_TITLE_SIZE + (DIFF_TITLE_SIZE * ratio),
        toolbarHeight: rowHeight + (diffHeight * ratio)
      };
    },
    adjustHeight(calc) {
      cancelAnimationFrame(this.adjustFrame);
      this.adjustFrame = requestAnimationFrame(() => {
        const { ratio, fontSize, toolbarHeight, scroll } = calc || this.calculate();
        const prevRatio = this.ratio;

        if(this.flexible) {
          const $title = this.$el.querySelector(".mdc-toolbar__title");
          $title.style.fontSize = `${fontSize}rem`;

          const $row = this.$el.querySelector(".mdc-toolbar__row");
          $row.style.height = `${toolbarHeight}px`;
          this.ratio = ratio;
        } else if(this.waterfall) {
          this.ratio = scroll ? 0 : 1;
        }


        // Gain minimized if scrolled with waterfall
        // gain minimised if scrolled with waterfall flex
        // gain maximised if not scroll with waterfall flex
        if(ratio === 1) {
          // Maximized
          this.$el.classList.add(MAXIMISED_CLASS);
          this.$el.classList.remove(MINIMIZED_CLASS);
        } else if(ratio === 0) {
          // Minimized
          this.$el.classList.add(MINIMIZED_CLASS);
          this.$el.classList.remove(MAXIMISED_CLASS);
        } else if(prevRatio === 0 || prevRatio === 1) {
          // Clear minimized and maximized classes
          this.$el.classList.remove(MINIMIZED_CLASS);
          this.$el.classList.remove(MAXIMISED_CLASS);
        }
      });      
    },
    adjustSibling() {
      const { $el, rowHeight, toolbarHeight } = this;
      const sibling = $el.nextElementSibling;

      if(sibling) {
        let height = toolbarHeight;
        if($el.children.length) {
          height += ($el.children.length - 1) * rowHeight;
        }

        sibling.classList.add("mdc-toolbar-fixed-adjust");
        sibling.style.marginTop = `${height}px`;
      }
    },
    scrollTop() {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
  }
};
</script>