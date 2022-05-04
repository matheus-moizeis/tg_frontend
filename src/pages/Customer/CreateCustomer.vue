<template>
  <q-page padding>
    <div class="container">
      <div class="row">
        <div class="q-pl-md q-pt-md q-mb-md text-h4">Cadastro de Cliente</div>
      </div>
      <q-form ref="customerForm" @submit="onSubmit">
        <div class="row justify-center q-gutter-sm">
          <q-input
            outlined
            v-model="newCustomer.nome"
            label="Nome"
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="newCustomer.cpf"
            mask="###.###.###-##"
            unmasked-value
            label="CPF"
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="newCustomer.dt_nascimento"
            stack-label
            type="date"
            label="Nascimento"
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="newCustomer.telefone"
            label="Celular"
            mask="(##) #####-####"
            unmasked-value
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="newCustomer.cep"
            label="CEP"
            mask="#####-###"
            unmasked-value
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="newCustomer.rua"
            label="Rua"
            class="col-sm-12 col-md-5 col-lg-5"
          />

          <q-input
            outlined
            v-model="newCustomer.bairro"
            label="Bairro"
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="newCustomer.numero"
            label="Nº"
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
  name: 'CreateCustomer',
  data () {
    return {
      newCustomer: {
        nome: null,
        cpf: null,
        telefone: null,
        dt_nascimento: null,
        rua: null,
        bairro: null,
        cep: null,
        numero: null
      }
    }
  },
  methods: {

    returnCreate () {
      this.$router.push({ name: 'Customer' })
    },
    async onSubmit () {
      const token = await this.getToken()
      try {
        const { data, status } = await api.post(
          '/clientes',
          {
            nome: this.newCustomer.nome,
            cpf: parseInt(this.newCustomer.cpf),
            telefone: this.newCustomer.telefone,
            dt_nascimento: this.newCustomer.dt_nascimento,
            rua: this.newCustomer.rua,
            bairro: this.newCustomer.bairro,
            cep: this.newCustomer.cep,
            numero: this.newCustomer.nome
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
            message: 'Cliente Cadastrado com sucesso!'
          })
          this.$router.push({ name: 'Customer' })
        } else {
          this.$q.notify({
            position: 'top-right',
            icon: 'feedback',
            type: 'warning',
            message: data.message
          })
          this.$router.push({ name: 'Customer' })
        }
      } catch (error) {
        this.$q.notify({
          position: 'top-right',
          icon: 'highlight_off',
          type: 'negative',
          message: error.data.message
        })
        this.$router.push({ name: 'Customer' })
      }
    },

    async getToken () {
      return await localStorage.getItem('token')
    }
  }
}
</script>
