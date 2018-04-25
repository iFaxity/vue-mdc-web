<template lang="pug">
demo-template(link="cards")
  mdc-card(slot="hero")
    mdc-card-media(image="/images/16-9.jpg")
    mdc-card-actions
      mdc-button(slot="button") Click me
      mdc-button(slot="button") Or me

      mdc-icon-toggle(slot="icon", :on="{content: 'favorite', label: 'Add to favorites'}", :off="{content: 'favorite_border', label: 'Remove from favorites'}")
      mdc-icon(slot="icon", icon="share", label="Share", ripple, action)
      mdc-icon(slot="icon", icon="more_vert", label="More Options", ripple, action)

  template(slot="usage")
    demo-code(lang="markup", code=`
<mdc-card>
  <mdc-card-media image="<image source>"/>
  <mdc-card-actions>
    <mdc-button slot="button">Click me</mdc-button>
    <mdc-button slot="button">Or me</mdc-button>

    <mdc-icon-toggle slot="icon" :on="{content: 'favorite', label: 'Add to favorites'}" :off="{content: 'favorite_border', label: 'Remove from favorites'}"/>
  </mdc-card-actions>
</mdc-form-field>`)

  // TODO: add data
  //template(slot="props")
    tr
      td checked
      td Boolean
      td false
      td Used to change the checked state of the checkbox
    tr
      td disabled
      td Boolean
      td false
      td Disables the checkbox from any input
    tr
      td indeterminate
      td Boolean
      td false
      td Changes the indetermined state of the checkbox
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';
import MdcIcon from '../../../packages/icon';

export default {
  name: 'DemoCard',
  components: { DemoTemplate, MdcIcon }
};
</script>