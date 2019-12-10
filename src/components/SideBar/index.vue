<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    enable-resize-watcher
    fixed
    app
  >
    <!-- <slot name="activator" :drawer="drawer" /> -->
    <v-list nav dense>
      <SideBarItem
        v-for="item in items"
        :key="item.path"
        :item="item"
        :matched-route-name="matchedRouteName"
        :matched-route-left="matchedRouteLeft"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import SideBarItem from './SideBarItem.vue'

export default {
  name: 'SideBar',
  components: { SideBarItem },
  data() {
    return {
      drawer: true
    }
  },
  computed: {
    ...mapGetters({
      items: 'permission/menus'
    }),
    matchedRouteName() {
      if (this.$route.matched && this.$route.matched.length > 0) {
        return this.$route.matched[0].name
      }
      return ''
    },
    matchedRouteLeft() {
      if (this.$route.matched && Array.isArray(this.$route.matched) && this.$route.matched.length > 0) {
        return this.$route.matched.slice(1)
      }
      return []
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>

<style scoped></style>
