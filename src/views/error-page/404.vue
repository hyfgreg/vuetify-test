<template>
  <v-container class="text-center" fill-height>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12>
        <p class="display-4">(/ □ \)~哦豁</p>
        <p class="display-2">找不到该页!</p>
        <p class="display-1">{{ targetURL }}</p>
        <p><v-btn color="primary" text @click.stop="goHome">回到首页</v-btn></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Page404',
  computed: {
    targetURL() {
      return `${this.$route.query.fullPath}`
    }
  },
  methods: {
    goHome() {
      this.$router.replace({ path: '/' }).catch(() => { console.log('all good') })
    }
  }
}
</script>

<style>

</style>
