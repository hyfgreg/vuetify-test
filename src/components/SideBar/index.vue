<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    enable-resize-watcher
    fixed
    app
  >
    <v-list nav dense>
      <SidebarItem v-for="item in items" :key="item.path" :item="item" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem.vue'

export default {
  name: 'SideBar',
  components: { SidebarItem },
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters({
      items: 'permission/menus'
    })
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style scoped></style>
