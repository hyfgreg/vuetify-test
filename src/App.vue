<template>
  <v-app>
    <app-bar @toggle-side-bar="$refs.SideBar.toggleDrawer()" />
    <side-bar ref="SideBar" />
    <v-content style="height: calc(100vh - 64px)">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </v-content>
    <vue-snotify />
  </v-app>
</template>

<script>
import AppBar from './components/AppBar/index.vue'
import SideBar from './components/SideBar/index.vue'

export default {
  name: 'App',
  components: {
    AppBar,
    SideBar
  }
}
</script>
