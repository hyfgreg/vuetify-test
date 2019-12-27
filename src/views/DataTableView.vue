<template>
  <data-table-layout>
    <template #header>
      <v-row>
        <v-col cols="2">
          <v-text-field label="开始日期" />
        </v-col>
        <v-col cols="2">
          <v-text-field label="结束日期" />
        </v-col>
        <v-col cols="2">
          <v-text-field label="用户名称" />
        </v-col>
        <v-col cols="2">
          <v-text-field label="用户ID" />
        </v-col>
        <v-col cols="2">
          <v-select label="类型" />
        </v-col>
        <div style="flex-grow: 10000" />
        <v-col>
          <v-btn color="primary">确定</v-btn>
        </v-col>
      </v-row>
    </template>
    <template>
      <v-data-table
        :headers="table.headers"
        :items="tablePageData"
        :server-items-length="1000"
        hide-default-footer
        class="elevation-1"
      >
        <template v-if="tablePageData.length > 0" #body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.create_time | GM_timeFormat }}</td>
              <td>{{ item.id }}</td>
              <td>{{ item.account.customer_username }}</td>
              <td>{{ item.account.customer_user_sn }}</td>
              <td>{{ item.related_type }}</td>
              <td>{{ item.related_sub_type }}</td>
              <td>{{ item.location ? item.location.name : '无' }}</td>
              <td>{{ item.counter? item.counter.name : '无' }}</td>
              <td>{{ item.amount | GM_fenToYuan }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </template>
        <template v-slot:no-data>
          没有数据
        </template>
      </v-data-table>
    </template>
    <template #footer>
      <v-pagination
        circle
        :value="Number(filteredQuery.page)"
        :length="pageCount"
        :total-visible="11"
        @input="changePage"
      />
    </template>
  </data-table-layout>
</template>

<script>
import { api } from '../apis'
import DataTableLayout from '@/Layout/DataTableLayout.vue'
import pageMixin from '@/mixins/page.js'

export default {
  name: 'DataTableView',
  components: { DataTableLayout },
  mixins: [pageMixin],
  data() {
    return {
      fetchDataFunction: api.getAccountRecord,
      table: {
        headers: [
          {
            sortable: false,
            text: '时间'
          },
          {
            sortable: false,
            text: '单号'
          },
          {
            sortable: false,
            text: '用户名称'
          },
          {
            sortable: false,
            text: '用户ID'
          },
          {
            sortable: false,
            text: '类型'
          },
          {
            sortable: false,
            text: '项目'
          },
          {
            sortable: false,
            text: '餐厅(店铺)'
          },
          {
            sortable: false,
            text: '渠道'
          },
          {
            sortable: false,
            text: '金额'
          },
          {
            sortable: false,
            text: '状态'
          }
        ]
      },
      extra_query: {
        o: '-create_time',
        extras: 'account,counter,location,request_user_name'
      }
    }
  }
}
</script>

<style scoped>

</style>
