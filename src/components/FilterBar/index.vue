<template>
  <div class="grid-">
    <v-layout>
      <v-flex>
        <v-select
          label="餐厅"
        />
      </v-flex>
      <v-flex>
        <InputDate
          label="日期"
          clearable
        />
      </v-flex>
      <v-flex>
        <v-text-field
          label="联系人"
          clearable
        />
      </v-flex>
      <div style="flex-grow: 10000" />
      <v-flex>
        <v-btn color="primary">
          查询
        </v-btn>
      </v-flex>
      <v-flex>
        <v-btn color="primary">
          导出
        </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  props: {}
}
</script>

<style scoped>

</style>
