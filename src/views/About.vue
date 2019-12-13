<template>
  <v-container>
    <v-layout column>
      <v-flex xs2><FilterBar /></v-flex>
      <v-flex>
        <data-table>
          <template #action>
            <v-icon
              small
              class="mr-2"
              @click="()=>{}"
            >
              edit
            </v-icon>
          </template>
        </data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FilterBar from '@/components/FilterBar/index'
import DataTable from '@/components/DataTable/index'

export default {
  name: 'About',
  components: { FilterBar, DataTable }
}
</script>

<style scoped>

</style>
