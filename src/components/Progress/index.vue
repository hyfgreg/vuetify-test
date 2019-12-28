<template>
  <v-progress-linear
    v-show="active"
    :value="value"
    :color="configure.color"
    :height="configure.height"
    buffer-value="0"
    fixed
    top
    class="progress"
  />
</template>

<script>
export default {
  name: 'Progress',
  data() {
    return {
      active: false,
      value: 0,
      startInterval: 0,
      doneInterval: 0,
      defaultConfigure: {
        color: '#69F0AE',
        height: '3px'
      }
    }
  },
  computed: {
    configure() {
      if (this.$xmGlobalConfig.progress) {
        const configure = this.$xmGlobalConfig.progress
        return {
          ...this.defaultConfigure,
          ...configure
        }
      }
      return this.defaultConfigure
    }
  },
  created() {
    this.$eventHub.$on('progressStart', () => {
      this.start()
    })
    this.$eventHub.$on('progressDone', () => {
      this.done()
    })
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    clear() {
      clearInterval(this.startInterval)
      clearInterval(this.doneInterval)
    },
    start() {
      this.clear()
      this.value = 0
      this.active = true
      this.startInterval = setInterval(() => {
        if (this.value === 80) {
          clearInterval(this.startInterval)
        }
        this.value += 10
      }, 50)
    },
    done() {
      this.clear()
      clearInterval(this.startInterval)
      this.doneInterval = setInterval(() => {
        if (this.value === 100) {
          clearInterval(this.doneInterval)
          setTimeout(() => { this.active = false }, 300)
        }
        this.value += 10
      }, 10)
    }
  }
}
</script>

<style scoped>
.progress{
  z-index: 99999;
}
</style>
