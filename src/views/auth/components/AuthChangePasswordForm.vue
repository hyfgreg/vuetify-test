<template>
  <v-card>
    <v-toolbar dark color="primary" flat>
      <v-toolbar-title>修改密码</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form ref="theForm" @keypress.enter.native="onSubmit">
        <v-text-field
          v-model="theForm.current_password"
          prepend-icon="person"
          label="当前密码"
          required
          type="password"
          :rules="theFormRules.current_password"
        />
        <v-text-field
          v-model="theForm.password1"
          prepend-icon="lock"
          label="新密码"
          required
          type="password"
          :rules="theFormRules.password1"
        />
        <v-text-field
          v-model="theForm.password2"
          prepend-icon="lock"
          label="再次输入新密码"
          required
          type="password"
          :rules="theFormRules.password2"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" @click="onSubmit">提交</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { api } from '@/apis'

export default {
  name: 'AuththeForm',
  data() {
    return {
      theForm: {
        current_password: '',
        password1: '',
        password2: ''
      },
      theFormRules: {
        current_password: [
          v => {
            if (!this.GM_toBool(v)) {
              return '请输入当前密码'
            } else {
              return true
            }
          }
        ],
        password1: [
          v => {
            if (!this.GM_toBool(v)) {
              return '请输入新密码'
            } else {
              return true
            }
          }
        ],
        password2: [
          v => {
            if (!this.GM_toBool(v)) {
              return '请再次输入新密码'
            } else if (v !== this.theForm.password1) {
              return '两次新密码输入不一致'
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
      api.changePassword(this.theForm).then((response) => {
        if (response.data.error_reason) {
          this.$snotify.error(response.data.error_reason, '请求出错', {
            duration: 1000
          })
          return
        }

        this.$snotify.success('修改密码成功, 即将跳转到首页', '提示', {
          duration: 1000
        })
        this.$store.dispatch('auth/authInfoSetter', { ...response.data, username: this.$store.state['auth'].authInfo.username }).then(
          () => { this.$router.replace({ path: this.$route.query.redirect || '/' }) }
        )
      }).catch(error => {
        console.log(error)
        this.$snotify.error('请输入正确的信息', '提示', {
          duration: 1000
        })
        console.log(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  padding: 20px;
  min-width: 500px;
}
</style>
