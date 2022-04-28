<template>
  <q-page class="row justify-center items-center">
    <div class="q-pa-lg login-container col-4">
      <h1 class="text-h4 q-mb-xl items-center text-center">Login</h1>
      <div>
        <q-form ref="loginForm" @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Email *"
            lazy-rules
            type="email"
            :rules="emailRules"
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input
            filled
            type="password"
            v-model="password"
            label="Senha *"
            lazy-rules
            :rules="passwordRules"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <div class="column q-gutter-md">
            <q-btn label="Entrar" type="submit" color="primary" />
            <q-btn label="Cadastrar" :to="{ name:'CreateUser' }" flat color="primary" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: null,
      password: null
    }
  },

  methods: {
    onSubmit () {
      alert('ok')
    }
  },

  computed: {
    passwordRules () {
      return [
        val => (val && val.length > 0) || 'Informe sua senha',
        val => (val.length > 3 && val.length < 50) ||
         'A senha deve possuir entre 3 a 50 caracteres'
      ]
    },

    emailRules () {
      return [(val) => (val && val.length > 0) || 'Informe o email']
    }
  }
}
</script>

<style>
.login-container {
  border: 1px solid gray;
  border-radius: 4px;
}
</style>
