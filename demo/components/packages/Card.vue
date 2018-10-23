<template lang="pug">
demo-template(link="cards", :details="details")
  mdc-card(slot="hero")
    mdc-card-media(image="/images/16-9.jpg")
    mdc-card-actions
      template(slot="button")
        mdc-button Click me
        mdc-button Or me

      template(slot="icon")
        mdc-icon-toggle(:on="{content: 'favorite', label: 'Add to favorites'}", :off="{content: 'favorite_border', label: 'Remove from favorites'}")
        mdc-card-icon(icon="share", label="Share")
        mdc-card-icon(icon="more_vert", label="More Options")

  template(slot="usage")
    demo-code(lang="markup", code=`
<mdc-card>
  <mdc-card-media image="<image source>"/>
  <mdc-card-actions>
    <mdc-button slot="button">Click me</mdc-button>
    <mdc-button slot="button">Or me</mdc-button>

    <mdc-icon-toggle slot="icon" :on="{content: 'favorite', label: 'Add to favorites'}" :off="{content: 'favorite_border', label: 'Remove from favorites'}"/>
    <mdc-card-icon slot="icon", icon="more_vert", label="More Options"/>
  </mdc-card-actions>
</mdc-form-field>`)
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

const DATA = {
  props: [
    { header: 'MDCCard' },
    { name: 'outlined', type: 'Boolean', desc: '' },

    { header: 'MDCCardMedia' },
    { name: 'square', type: 'Boolean', desc: '' },
    { name: 'image', type: 'String', desc: '' },

    { header: 'MDCCardActions' },
    { name: 'fullBleed', type: 'Boolean', desc: '' },

    { header: 'MDCCardIcon' },
    { name: 'icon*', type: 'String', desc: '' },
    { name: 'label', type: 'String', desc: '' },
  ],
};

export default {
  name: 'DemoCard',
  components: { DemoTemplate },
  data() {
    return {
      details: DATA,
    };
  },
};
</script>