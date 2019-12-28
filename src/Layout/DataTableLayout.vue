<template>
  <v-container style="height:100%" fluid>
    <v-row class="flex-column flex-wrap" style="height:100%">
      <v-col cols="1" style="max-width:100%">
        <slot name="header">
          <div>slot: header, 用filter项替代</div>
        </slot>
      </v-col>
      <v-col style="overflow:auto; max-width:100%">
        <slot name="default">
          <div>这里是default</div>
        </slot>
      </v-col>
      <v-col cols="1" style="max-width:100%">
        <slot name="footer">
          <div>slot: footer, 用分页替代</div>
        </slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DataTableLayout'
}
</script>

<style scoped>
.container.grid-list-md .row .col {
    padding: 4px;
}

.row.column {
    flex-direction: column;
}

.filter-bar{
    flex-basis: 8%;
}

.content{
    flex-basis: 84%;
    overflow:auto;
}

.pagination{
    flex-basis: 8%;
}

div::-webkit-scrollbar{
  width:10px;
  height:10px
}
div::-webkit-scrollbar-track{
  background: #EEEEEE;
  border-radius:2px;
}
div::-webkit-scrollbar-thumb{
  background: #BDBDBD;
  border-radius:2px;
}
div::-webkit-scrollbar-thumb:hover{
  background: #757575;
}
div::-webkit-scrollbar-corner{
  background: #BDBDBD;
  border-radius:2px;
}
</style>
