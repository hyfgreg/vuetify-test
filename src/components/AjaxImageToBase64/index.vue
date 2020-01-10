<template>
  <div d-none />
</template>

<script>
// 将一个url地址通过ajax请求后转化为base64形式的dataurl
// <AjaxImageToBase64 src="imageUrl", v-model="base64Url"></AjaxImageToBase64>

function imageToBase64(data) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(data)
    reader.onloadend = () => resolve(reader.result)
  })
}

export default {
  name: 'AjaxImageToBase64',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    'src': String,
    // eslint-disable-next-line vue/require-default-prop
    'value': String,
    'async': {
      type: Boolean,
      default: false
    }, // true则是lazy, 必须手动调用update
    'method': {
      type: String,
      default: 'get'
    }
  },
  data() {
    return {
      lastSrc: ''
    }
  },
  watch: {
    // src更改的时候
    src() {
      this.updateValueIfSync()
    }
  },
  created() {
    this.updateValueIfSync()
  },
  methods: {
    updateValue() {
      const self = this
      // 上个url一样不发请求
      if (this.src === this.lastSrc) {
        return
      }

      this.$xmHTTPClient({
        method: this.method,
        url: self.src,
        responseType: 'blob'
      }).then(
        (response) => {
          imageToBase64(response.data).then(
            data => {
              self.lastSrc = self.src
              self.$emit('input', data)
            }
          )
        }
      ).catch(() => {
        self.lastSrc = ''
        self.$emit('input', '')
        console.error('NotFound image', self.src)
      })
    },
    updateValueIfSync() {
      if (!this.async) {
        this.updateValue()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
