<template lang="pug">
demo-template(stacked, link="input-controls/text-field", :details="details")
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
</template>

<script>
import DemoTemplate from '../DemoTemplate.vue';

const DATA = {
  slots: [],
  props: [
    { name: 'multiline', type: 'Boolean', desc: 'If true then the component will render a textarea with multiline support.' },
    { name: 'fullwidth', type: 'Boolean', desc: 'Uses the full width of the container of this component. Also removes the floating label.' },
    { name: 'dense', type: 'Boolean', desc: 'Halves the padding below the textfield. Also shrinks the font size of the label.' },
    { name: 'disabled', type: 'Boolean', desc: 'Sets the disabled attribute to the internal input element. Prevents any input on the input element.' },
    { name: 'required', type: 'Boolean', desc: 'Sets the required attribute to the internal input element.' },
    { name: 'id', type: 'String', desc: 'Sets the id attribute to the internal input element. If none is used the component will generate an id to use internally.' },
    { name: 'value', type: 'String', desc: 'Sets the value of the internal input element.' },
    { name: 'label', type: 'String', desc: 'Sets the text on the floating label.' },
    { name: 'name', type: 'String', desc: 'Sets the name attribute to the internal input element.' },
    { name: 'pattern', type: 'String', desc: 'Adds a regex pattern to validate against. Used for validation.' },
    { name: 'minlength', type: 'String, Number', desc: 'Sets the allowed mininum length of the input value. Used for validation.' },
    { name: 'maxlength', type: 'String, Number', desc: 'Sets the allowed maximum length of the input value. Used for validation.' },

    { header: 'MDCTextfield only' },
    { name: 'boxed', type: 'Boolean', desc: 'Adds a visible box behind the textfield.' },
    { name: 'outlined', type: 'Boolean', desc: 'Adds a rounded outline around the textfield.' },
    { name: 'leading-icon', type: 'String', desc: 'Sets the material-icon used by name. Icon appears before the input element.' },
    { name: 'trailing-icon', type: 'String', desc: 'Sets the material-icon used by name. Icon appears after the input element.' },
    { name: 'type', type: 'String', desc: 'Sets the type of the input. Only allows textfield types like: "number", "email", "password", .etc.' },
    { name: 'min', type: 'String, Number', desc: 'Sets the minumum value allowed. Only used when type is "number".' },
    { name: 'max', type: 'String, Number', desc: 'Sets the maximum value allowed. Only used when type is "number".' },
    { name: 'step', type: 'String, Number', desc: 'Limits the values increments between min and max. Only used when type is "number".' },

    { header: 'MDCTextarea only' },
    { name: 'rows', type: 'String, Number', desc: 'Sets the elements width in amount of characters.' },
    { name: 'cols', type: 'String, Number', desc: 'Sets the elements height in amount of characters.' },
  ],
  events: [],
};

export default {
  name: 'DemoTextfield',
  components: { DemoTemplate },
  data() {
    return {
      details: DATA,
    };
  }
};
</script>