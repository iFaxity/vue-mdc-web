<template lang="pug">
table
  thead
    tr
      th(v-for="{ header } in columns") {{ header }}
  tbody
    tr(v-for="row in rows")
      th(v-if="row.header", :colspan="colspan") {{ row.header }}
      template(v-else)
        td(v-for="{ name } in columns") {{ row[name] }}
</template>

<script>
const HEADER_TYPES = {
  slots: [
    { name: 'name', header: 'Slot', },
    { name: 'desc', header: 'Description', },
  ],
  props: [
    { name: 'name', header: 'Prop', },
    { name: 'type', header: 'Type', },
    { name: 'default', header: 'Default', },
    { name: 'desc', header: 'Description', },
  ],
  events: [
    { name: 'name', header: 'Event', },
    { name: 'args', header: 'Args', },
    { name: 'desc', header: 'Description', },
  ],
};

function getFirstType(type) {
  const index = type.indexOf(',');
  if(index >= 0) {
    type = type.substr(0, index);
  }
  return type;
}

export default {
  name: 'DemoTable',
  props: {
    rows: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: value => {
        const type = getFirstType(value);
        return HEADER_TYPES[type] != null;
      },
    },
  },
  
  computed: {
    firstType() {
      return getFirstType(this.type);
    },
    columns() {
      return HEADER_TYPES[this.firstType];
    },
    colspan() {
      return this.columns.length;
    }
  },
};
</script>