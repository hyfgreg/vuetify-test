<template>
  <v-app>
    <Progress />
    <app-bar @toggle-side-bar="sideBar && $refs.SideBar.toggleDrawer()" />
    <side-bar v-if="sideBar" ref="SideBar" />
    <v-content style="height: calc(100vh - 64px)">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </v-content>
    <vue-snotify />
  </v-app>
</template>

<script>
import Vue from 'vue'
import AppBar from './components/AppBar/index.vue'
import SideBar from './components/SideBar/index.vue'
import Progress from './components/Progress/index.vue'

export default {
  name: 'App',
  components: {
    AppBar,
    SideBar,
    Progress
  },
  data() {
    return {
      sideBar: Vue.xmGlobalConfig.sideBar
    }
  }
}
</script>

<style>

</style>
