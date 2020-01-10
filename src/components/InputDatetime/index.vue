<template>
  <v-menu
    ref="menu"
    v-model="show"
    offset-y
    :close-on-content-click="false"
    persistent
    max-width="600px"
  >
    <template #activator="{ on }">
      <v-text-field v-model="datetime" v-bind="inputAttr" class="caption" v-on="on" />
    </template>
    <DatetimePicker
      v-model="datetime"
      no-title
      locale="zh-cn"
      v-bind="pickerAttr"
      scrollable
    >
      <v-spacer />
      <v-btn text color="primary" @click="$refs.menu.save(datetime)">确定</v-btn>
    </DatetimePicker>
  </v-menu>
</template>

<script>
import DatetimePicker from './components/DatetimePicker'

export default {
  name: 'InputDatetime',
  components: { DatetimePicker },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    datetime: {
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
        label: '选择日期与时间'
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
