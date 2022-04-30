<template>
  <q-page class="row justify-center items-center">
    <div class="q-pa-lg login-container col-4">
      <h1 class="text-h4 q-mb-xl items-center text-center">Login</h1>
      <div>
        <q-form ref="loginForm" @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="formData.email"
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
            v-model="formData.password"
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
import { api } from 'boot/axios'
import { QSpinnerGears } from 'quasar'

export default {
  name: 'LoginPage',
  data () {
    return {
      formData: {
        email: null,
        password: null
      }
    }
  },

  methods: {
    async onSubmit () {
      api.post('/tokens', {
        email: this.formData.email,
        password: this.formData.password
      })
        .then(response => {
          this.$q.notify({
            spinner: QSpinnerGears,
            timeout: 1000,
            message: 'Carregando...',
            position: 'center'
          })
          this.setToken(response.data.token)
          this.$router.push({ name: 'Ticket' })
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            position: 'top',
            avatar: true,
            timeout: 500,
            message: error.response.data.errors
          })
          this.onReset()
        })
    },

    async setToken (token) {
      try {
        localStorage.clear()
        return await localStorage.setItem('token', 'Bearer ' + token)
      } catch (error) {
        alert(error)
      }
    },

    async onReset () {
      await this.resetForm()
      this.$refs.loginForm.resetValidation()
    },

    async resetForm () {
      this.formData = {
        email: '',
        password: ''
      }
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
