<template>
  <q-page padding>
    <div class="container">
      <div class="row">
        <div class="q-pl-md q-pt-md q-mb-md text-h4">
          Cadastro de Funcionário
        </div>
      </div>
            <q-form ref="customerForm" @submit="onSubmit">
        <div class="row justify-center q-gutter-sm">
          <q-input
            outlined
            v-model="newEmployee.nome"
            label="Nome"
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="newEmployee.telefone"
            label="Celular"
            mask="(##) #####-####"
            unmasked-value
            class="col-sm-12 col-md-5 col-lg-5"
          />

        </div>
        <div class="row q-pl-md q-mt-xl">
          <div class="q-gutter-md">
            <q-btn label="Salvar" color="positive" type="submit" />
            <q-btn label="Voltar" color="grey-8" @click="returnCreate" />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
export default {
  name: 'CreateEmployee',
  data () {
    return {
      newEmployee: {
        nome: null,
        telefone: null
      }
    }
  },
  methods: {
    async onSubmit () {
      const token = await this.getToken()
      try {
        const { data, status } = await api.post(
          '/funcionarios', {
            nome: this.newEmployee.nome,
            telefone: this.newEmployee.telefone
          },
          {
            headers: { Authorization: token }
          }
        )
        if (status === 200) {
          this.$q.notify({
            position: 'top-right',
            icon: 'check_circle_outline',
            type: 'positive',
            message: 'Funcionário cadastrado com sucesso!'
          })
          this.$router.push({ name: 'Employee' })
        } else {
          this.$q.notify({
            position: 'top-right',
            icon: 'feedback',
            type: 'warning',
            message: data.message
          })
          this.$router.push({ name: 'Employee' })
        }
      } catch (error) {
        this.$q.notify({
          position: 'top-right',
          icon: 'highlight_off',
          type: 'negative',
          message: error.data.message
        })
        this.$router.push({ name: 'Employee' })
      }
    },

    async getToken () {
      return await localStorage.getItem('token')
    },

    returnCreate () {
      this.$router.push({ name: 'Employee' })
    }
  }
}
</script>
