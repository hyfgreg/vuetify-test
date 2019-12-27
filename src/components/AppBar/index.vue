<template>
  <v-app-bar app color="primary" dark clipped-left>
    <v-app-bar-nav-icon v-if="sideBar" @click.stop="$emit('toggle-side-bar')" />
    <v-toolbar-title>{{ appBarTitle.toUpperCase() }}</v-toolbar-title>
    <v-spacer />
    <v-btn v-if="!GM_username && $route.name !== 'login'" text @click.stop="login">
      登录
    </v-btn>
    <v-btn v-if="GM_username" text>
      修改密码
    </v-btn>
    <v-btn v-if="GM_username" text @click.stop="logout">
      登出
    </v-btn>
  </v-app-bar>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'AppBar',
  data() {
    return {
      appBarTitle: Vue.xmGlobalConfig.appBarTitle,
      sideBar: Vue.xmGlobalConfig.sideBar
    }
  },
  methods: {
    login() {
      this.$router.push({ name: 'login' })
    },
    logout() {
      this.$store
        .dispatch('auth/authInfoSetter', {})
        .then(() => this.$store.dispatch('permission/reset'))
        .then(() => this.$store.dispatch('permission/resetRouter'))
        .then(() => this.$router.push({ name: 'login' }))
    }
  }
}
</script>

<style scoped>

</style>
