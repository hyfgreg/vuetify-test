<template>
  <v-container class="page" d-flex fill-height>
    <v-layout align-center justify-center fill-height>
      <v-flex xs12 sm8 md6>
        <AuthLoginForm />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AuthLoginForm from './components/AuthLoginForm.vue'

export default {
  name: 'AuthLoginPage',
  components: {
    AuthLoginForm
  },

  data() {
    return { }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
