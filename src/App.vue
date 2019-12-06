<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" enable-resize-watcher fixed app>
      <!-- <NavigationList :items="items" /> -->
    </v-navigation-drawer>
    <v-app-bar
      app
      color="primary"
      dark
      :clipped-left="clipped"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-spacer />

      <v-btn v-if="!GM_username" text :to="{'name': 'login'}">
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

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    drawer: false,
    clipped: true,
    items: []
  }),
  methods: {
    logout() {
      this.$store.dispatch('auth/authInfoSetter', {}).then(() =>
        this.$router.push({ 'name': 'login' })
      )
    }
  }
}
</script>
