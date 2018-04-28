<template lang="pug">
demo-template(link="input-controls/text-field", stacked)
  template(slot="hero")
    mdc-textfield(label="Basic Textfield")
    mdc-textfield(boxed, label="Boxed Textfield")
    mdc-textfield(outlined, label="Outlined Textfield")

  template(slot="usage")
    demo-code(code=`<mdc-textfield v-model="value" label="Basic Textfield"/>`)
    demo-code(lang="javascript", code=`
export default {
  data() {
    return { value: '' };
  },
};`)
    p To use the boxed, outlined or multiline version add the supplied classes like so:
    demo-code(code=`
<mdc-textfield boxed v-model="value" label="Boxed textfield"/>
<!-- Or -->
<mdc-textfield outlined v-model="value" label="Outlined textfield"/>
<!-- Or -->
<mdc-textfield multiline v-model="value" label="Multiline textfield"/>`)
    p However these version can't be used together with each other and should only be used seperately.

  template(slot="props")
    tr
      td multiline
      td Boolean
      td false
      td If true then the component will render a textarea with multiline support.
    tr
      td fullwidth
      td Boolean
      td false
      td Uses the full width of the container of this component. Also removes the floating label.
    tr
      td dense
      td Boolean
      td false
      td Halves the padding below the textfield. Also shrinks the font size of the label.
    tr
      td disabled
      td Boolean
      td false
      td Sets the disabled attribute to the internal input element. Prevents any input on the input element.
    tr
      td required
      td Boolean
      td false
      td Sets the required attribute to the internal input element.
    tr
      td id
      td String
      td
      td Sets the id attribute to the internal input element. If none is used the component will generate an id to use internally.
    tr
      td value
      td String
      td
      td Sets the value of the internal input element.
    tr
      td label
      td String
      td
      td Sets the text on the label element.
    tr
      td name
      td String
      td
      td Sets the name attribute to the internal input element.
    tr
      td pattern
      td String
      td
      td Adds a regex pattern to validate against. Used for validation.
    tr
      td minlength
      td String, Number
      td
      td Sets the allowed mininum length of the input value. Used for validation.
    tr
      td maxlength
      td String, Number
      td
      td Sets the allowed maximum length of the input value. Used for validation.
    tr
      th(colspan="4") MDCTextfield only
    tr
      td boxed
      td Boolean
      td false
      td Adds a visible box behind the textfield.
    tr
      td outlined
      td Boolean
      td false
      td Adds a rounded outline behind the textfield.
    tr
      td leadingIcon
      td String
      td
      td Sets the material-icon used by name. Icon appears before the input element.
    tr
      td trailingIcon
      td String
      td
      td Sets the material-icon used by name. Icon appears after the input element.
    tr
      td type
      td String
      td
      td Sets the type of the input. Only allows textfield types like: 'number', 'email', 'password', .etc.
    tr
      td min
      td String, Number
      td
      td Sets the minumum value allowed. Only used when type is 'number'.
    tr
      td max
      td String, Number
      td
      td Sets the maximum value allowed. Only used when type is 'number'.
    tr
      td step
      td String, Number
      td
      td Limit the values increments between min and max. Only used when type is 'number'.  
    tr
      th(colspan="4") MDCTextarea only
    tr
      td rows
      td String, Number
      td
      td Sets the elements width in amount of characters.
    tr
      td cols
      td String, Number
      td
      td Sets the elements height in amount of characters.
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

export default {
  name: 'DemoTextfield',
  components: { DemoTemplate }
};
</script>