<template>
  <v-app>
    <side-bar ref="SideBar" />
    <v-app-bar app color="primary" dark :clipped-left="clipped">
      <v-app-bar-nav-icon @click.stop="$refs.SideBar.toggleDrawer()" />

      <v-spacer />

      <v-btn v-if="!GM_username" text @click.stop="login">
        登录
      </v-btn>
      <v-btn v-if="GM_username" text>
        修改密码
      </v-btn>
      <v-btn v-if="GM_username" text @click.stop="logout">
        登出
      </v-btn>
    </v-app-bar>

    <v-content style="height: calc(100vh - 64px)">
      <router-view />
    </v-content>
    <vue-snotify />
  </v-app>
</template>

<script>
import SideBar from './components/SideBar/index.vue'

export default {
  name: 'App',

  components: {
    SideBar
  },

  data: () => ({
    drawer: false,
    clipped: true,
    items: []
  }),
  methods: {
    login() {
      this.$router.push({ name: 'login' })
    },
    logout() {
      this.$store
        .dispatch('auth/authInfoSetter', {}).then(() => this.$store.dispatch('permission/reset')).then(() => this.$store.dispatch('permission/resetRouter'))
        .then(() => this.$router.push({ name: 'login' }))
    }
  }
}
</script>
