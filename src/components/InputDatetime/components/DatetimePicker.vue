<template>
  <v-card>
    <v-date-picker
      v-model="date"
      locale="zh-hans"
      no-title
      scrollable
      width="300"
      class="elevation-0"
    />
    <v-time-picker
      v-model="time"
      format="24hr"
      scrollable
      width="300"
      class="elevation-0"
    />
    <v-card-actions><slot /></v-card-actions>
  </v-card>
</template>
<script>

import { strptime, strfdate } from '@/utils/datetime'

export default {
  name: 'DatetimePicker',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    date: {
      get() {
        const invalid = strptime(this.value)
        if (invalid === null) {
          return strfdate(new Date())
        } else {
          return this.value.substring(0, 10)
        }
      },
      set(value) {
        const datetime = value + 'T' + this.time + ':00'
        this.$emit('input', datetime)
      }

    },
    time: {
      get() {
        const invalid = strptime(this.value)
        console.log(invalid)
        if (invalid === null) {
          return '00:00'
        } else {
          return this.value.split('T')[1].substring(0, 5)
        }
      },
      set(value) {
        const datetime = this.date + 'T' + value + ':00'
        this.$emit('input', datetime)
      }
    }
  }
}
</script>
