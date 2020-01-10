<template>
  <v-menu
    ref="menu"
    v-model="show"
    offset-y
    :close-on-content-click="false"
    persistent
    max-width="300px"
    style="width:100%"
  >
    <template #activator="{ on }">
      <v-text-field
        v-model="time"
        :label="label"
        v-bind="inputAttr"
        class="caption"
        v-on="on"
      />
    </template>
    <v-card>
      <v-time-picker
        v-model="time"
        format="24hr"
        scrollable
        width="300"
        class="elevation-0"
      >
        <v-spacer />
        <v-btn text color="primary" @click="$refs.menu.save(time)">确定</v-btn>
      </v-time-picker>
    </v-card>
  </v-menu>
</template>

<script>

export default {
  name: 'InputDate',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    },
    label: {
      type: String,
      default: '选择时间'
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    time: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    inputAttr() {
      const defaultAttr = {
        readonly: true,
        clearable: true,
        label: '选择时间'
      }
      return Object.assign(defaultAttr, this.$attrs)
    },
    pickerAttr() {
      const defaultAttr = {}
      return Object.assign(defaultAttr, this.$attrs)
    }
  }
}
</script>
