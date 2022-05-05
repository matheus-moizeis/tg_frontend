<template>
  <q-page padding>
    <div class="container">
      <div class="row">
        <div class="q-pl-md q-pt-md q-mb-md text-h4">Cadastro de Ticket</div>
      </div>
      <q-form ref="ticketForm" @submit="onSubmit">
        <div class="row justify-center q-gutter-sm">
          <q-select
            outlined
            v-model="newTicket.cliente_id"
            :options="customers"
            label="Cliente"
            class="col-sm-12 col-md-5 col-lg-5"
            emit-value
            map-options
            option-label="nome"
            option-value="id"
          />
          <q-select
            outlined
            v-model="newTicket.funcionario_id"
            :options="customers"
            label="Funcionário"
            class="col-sm-12 col-md-5 col-lg-5"
            emit-value
            map-options
            option-value="id"
            option-label="nome"
          />
          <q-input
            outlined
            v-model="newTicket.dt_retorno"
            stack-label
            type="date"
            label="Retorno"
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="newTicket.titulo"
            label="Titulo"
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-editor
            placeholder="Descrição"
            v-model="newTicket.descricao"
            height="13rem"
            class="col-sm-12 col-md-5 col-lg-5"
          />
        </div>
        <div class="row q-pl-md q-mt-xl">
          <div class="q-gutter-md">
            <q-btn label="Salvar" color="positive" type="submit" />
            <q-btn label="Voltar" color="grey-8" @click="returnTickets" />
          </div>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
export default {
  name: 'CreateTickt',
  data () {
    return {
      customers: [],
      employees: [],
      newTicket: {
        titulo: '',
        descricao: '',
        dt_retorno: '',
        cliente_id: '',
        funcionario_id: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      const token = await this.getToken()
      try {
        const { data, status } = await api.post(
          '/tickets',
          {
            titulo: this.newTicket.titulo,
            descricao: this.newTicket.descricao,
            dt_retorno: this.newTicket.dt_retorno,
            cliente_id: parseInt(this.newTicket.cliente_id),
            funcionario_id: parseInt(this.newTicket.funcionario_id)
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
        } else {
          this.$q.notify({
            position: 'top-right',
            icon: 'feedback',
            type: 'warning',
            message: data.message
          })
        }
        this.returnTickets()
      } catch (error) {
        console.log(error)
      }
    },
    returnTickets () {
      this.$router.push({ name: 'Ticket' })
    },
    async getEmployees () {
      const token = await this.getToken()
      try {
        const { data } = await api.get('/funcionarios', {
          headers: { Authorization: token }
        })
        this.employees = data
      } catch (error) {}
    },
    async getCustomers () {
      const token = await this.getToken()
      try {
        const { data } = await api.get('/clientes', {
          headers: { Authorization: token }
        })
        this.customers = data
      } catch (error) {
        console.log(error)
      }
    },
    async getToken () {
      return await localStorage.getItem('token')
    }
  },
  async mounted () {
    await this.getCustomers()
    await this.getEmployees()
  }
}
</script>
