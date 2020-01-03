<template>
  <v-container fill-height>
    <v-row class="justify-center align-center fill-height">
      <v-col cols="6">
        <AuthChangePasswordForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthChangePasswordForm from './components/AuthChangePasswordForm.vue'

export default {
  name: 'AuthChangePasswordPage',
  components: {
    AuthChangePasswordForm
  },

  data() {
    return { }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
