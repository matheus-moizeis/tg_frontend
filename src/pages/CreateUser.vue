<template>
  <q-page class="row justify-center items-center">
    <div class="q-pa-lg login-container col-4">
      <h1 class="text-h4 q-mb-xl items-center text-center">
        Cadastro de Usuário

      </h1>
      <div>
        <q-form ref="createUser" @submit="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="nome"
            label="Nome Completo *"
            lazy-rules
            type="text"
            :rules="nomeRules"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
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
            <q-btn label="Cadastrar" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  name: 'CreateUser',
  data () {
    return {
      email: null,
      password: null,
      nome: null
    }
  },

  methods: {
    ...mapActions('auth', ['createUser']),

    async onSubmit () {
      this.createUser({ nome: this.nome, email: this.email, password: this.password })
    }
  },

  computed: {
    passwordRules () {
      return [
        (val) => (val && val.length > 0) || 'Informe sua senha',
        (val) =>
          (val.length > 3 && val.length < 50) ||
          'A senha deve possuir entre 3 a 50 caracteres'
      ]
    },

    emailRules () {
      return [(val) => (val && val.length > 0) || 'Informe o email']
    },

    nomeRules () {
      return [
        (val) => (val && val.length > 0) || 'Informe o nome',
        (val) =>
          (val.length > 3 && val.length < 255) || 'nome deve ter entre 3 e 255 caracteres'
      ]
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
