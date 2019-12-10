<template>
  <transition name="fade-transform" mode="out-in">
    <router-view :key="key" />
  </transition>
</template>

<script>
export default {
  name: 'SubRouterView',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>

</style>
