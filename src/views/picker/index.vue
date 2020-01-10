<template>
  <v-container>
    <v-row>
      <v-col><InputDate v-model="inputDate" /></v-col>
    </v-row>
    <v-row>
      <v-col><InputTime v-model="inputTime" /></v-col>
    </v-row>
    <v-row>
      <v-col><InputDatetime v-model="inputDatetime" /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import InputDate from '@/components/InputDate'
import InputTime from '@/components/InputTime'
import InputDatetime from '@/components/InputDatetime'

export default {
  name: 'Picker',
  components: { InputDate, InputTime, InputDatetime },
  data() {
    return {
      inputDate: null,
      inputDatetime: null,
      inputTime: null
    }
  }
}
</script>

<style scoped>

</style>
