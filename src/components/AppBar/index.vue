<template>
  <v-app-bar app color="primary" dark clipped-left>
    <v-app-bar-nav-icon @click.stop="$emit('toggle-side-bar')" />
    <v-spacer />
    <v-btn v-if="!GM_username && $router.currentRoute.name !== 'login'" text @click.stop="login">
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
export default {
  name: 'AppBar',
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
