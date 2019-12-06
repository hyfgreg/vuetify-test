<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>登录</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form ref="theForm" autocomplete="off" @keypress.enter.native="onSubmit">
        <v-text-field v-model="theForm.username" prepend-icon="person" label="用户名" required :rules="theFormRules.username" />
        <v-text-field v-model="theForm.password" prepend-icon="lock" label="密码" required type="password" :rules="theFormRules.password" />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="onSubmit">登录</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { api } from '@/apis'
import { toBool } from '@/utils/toBool'

export default {
  name: 'AuththeForm',
  data() {
    return {
      theForm: {
        username: '',
        password: ''
      },
      theFormRules: {
        username: [
          v => {
            if (!toBool(v)) {
              return '请输入用户名'
            } else {
              return true
            }
          }
        ],
        password: [
          v => {
            if (!toBool(v)) {
              return '请输入密码'
            } else {
              return true
            }
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      const valid = this.$refs.theForm.validate()
      if (!valid) {
        return
      }
      api.login(this.theForm).then((response) => {
        if (response.data.error_reason) {
          this.$snotify.error(response.data.error_reason, '请求出错', {
            timeout: 1000
          })
          return
        }
        this.$snotify.success('登录成功', '提示', {
          timeout: 1000
        })
        this.$store.dispatch(
          'auth/authInfoSetter', { ...response.data, username: this.theForm.username }
        ).then(() => {
          this.$router.replace({ path: this.$route.query.redirect || '/' })
        })
      }).catch(error => {
        this.$snotify.error('请输入正确的信息', '提示', {
          timeout: 1000
        })
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
