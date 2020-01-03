<template>
  <v-container fill-height>
    <v-row class="justify-center align-center fill-height">
      <v-col cols="6">
        <AuthLoginForm />
      </v-col>
    </v-row>
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
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
