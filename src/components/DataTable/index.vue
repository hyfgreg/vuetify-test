<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <slot name="top" />
    </template>
    <template v-slot:item.action="{item}">
      <slot name="action" :item="item" />
    </template>
    <template slot="no-data">
      没有数据
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      default: () => [
        {
          text: '点心 (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '卡路里', value: 'calories' },
        { text: '脂肪 (g)', value: 'fat' },
        { text: '碳水 (g)', value: 'carbs' },
        { text: '蛋白质 (g)', value: 'protein' },
        { text: '操作', value: 'action', sortable: false }
      ]
    },
    items: {
      type: Array,
      default: () => [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
