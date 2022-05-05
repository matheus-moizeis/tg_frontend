<template>
  <q-page>
    <div class="row q-ml-sm q-mt-md">
      <div class="q-ml-md q-mt-md text-h4">Tickets</div>
    </div>
    <div class="q-pa-md">
      <q-table
        :data="tickets"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:top-left>
          <q-btn :to="{ name: 'CreateTicket' }" color="primary">Novo</q-btn>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              icon="create"
              color="primary"
              @click="popUpUpdate(props.row)"
              size="sm"
            />
            <q-btn
              icon="delete"
              color="negative"
              size="sm"
              class="q-ml-md"
              @click="popUpDelete(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <div>
      <q-dialog v-model="confirmDelete" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="warning" text-color="white" />
            <span class="q-ml-sm">Deseja realmente apagar o registro ? </span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Não"
              @click="loading = false"
              color="primary"
              v-close-popup
            />
            <q-btn
              flat
              label="Sim"
              color="negative"
              @click="deleteTicket"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialogUpdate" persistent>
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Editar Ticket</div>
          </q-card-section>

          <q-card-section class="q-pt-none"> </q-card-section>
          <q-form ref="customerForm" @submit="putTicket">
            <div class="row justify-center q-gutter-sm">
              <q-input
                outlined
                v-model="ticketUpdate.id"
                label="Id"
                disable
                readonly
                class="col-sm-12 col-md-5 col-lg-5"
              />
              <q-input
                outlined
                v-model="ticketUpdate.customer"
                label="Cliente"
                disable
                readonly
                class="col-sm-12 col-md-5 col-lg-5"
              />

              <q-input
                outlined
                v-model="ticketUpdate.employee"
                label="Funcionário"
                disable
                readonly
                class="col-sm-12 col-md-5 col-lg-5"
              />
              <q-input
                outlined
                v-model="ticketUpdate.dt_retorno"
                stack-label
                type="date"
                label="Retorno"
                class="col-sm-12 col-md-5 col-lg-5"
              />
              <q-input
                outlined
                v-model="ticketUpdate.titulo"
                label="Titulo"
                class="col-sm-12 col-md-5 col-lg-5"
              />
              <q-editor
                placeholder="Descrição"
                v-model="ticketUpdate.descricao"
                height="13rem"
                class="col-sm-10 col-md-10 col-lg-10"
              />

              <q-toggle
                v-model="ticketUpdate.finalizado"
                label="Finalizado"
                class="col-sm-12 col-md-5 col-lg-5"
              />
            </div>

            <q-card-actions align="right" class="text-teal">
              <q-btn
                color="positive"
                type="submit"
                label="Salvar"
                v-close-popup
              />
              <q-btn
                color="grey-8"
                label="Voltar"
                @click="loading = false"
                v-close-popup
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
export default {
  name: 'TicketPage',
  data () {
    return {
      dialogUpdate: false,
      ticketUpdate: {},
      confirmDelete: false,
      idTicket: 0,
      loading: false,
      filter: '',
      tickets: [],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'Id',
          align: 'left',
          field: (row) => row.id,
          sortable: true
        },
        {
          name: 'titulo',
          align: 'center',
          label: 'Titulo',
          field: 'titulo',
          sortable: true
        },
        {
          name: 'cliente',
          align: 'center',
          label: 'Cliente',
          field: (row) => row?.Cliente?.nome || 'Não possui',
          sortable: true
        },
        {
          name: 'funcionario',
          align: 'center',
          label: 'Funcionário',
          field: (row) => row?.Funcionario?.nome || 'Não possui',
          sortable: true
        },
        {
          name: 'dt_retorno',
          align: 'center',
          label: 'Retorno',
          field: 'dt_retorno',
          sortable: true
        },
        {
          name: 'actions'
        }
      ]
    }
  },
  methods: {
    async putTicket () {
      const token = await this.getToken()
      try {
        const { status, data } = await api.put(
          `/tickets/${this.ticketUpdate.id}`,
          {
            titulo: this.ticketUpdate.titulo,
            descricao: this.ticketUpdate.descricao,
            dt_retorno: this.ticketUpdate.dt_retorno,
            finalizado: this.ticketUpdate.finalizado
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
            message: 'Registro atualizado com sucesso!'
          })
        } else {
          this.$q.notify({
            position: 'top-right',
            icon: 'feedback',
            type: 'warning',
            message: data.message
          })
        }
      } catch (error) {
        console.log(error)
      }
      await this.getTickets()
      this.loading = false
    },

    popUpUpdate (ticketUpdate) {
      this.loading = true
      this.ticketUpdate = {
        id: parseInt(ticketUpdate.id),
        customer: ticketUpdate.Cliente.nome,
        employee: ticketUpdate.Funcionario.nome,
        dt_retorno: ticketUpdate.dt_retorno,
        titulo: ticketUpdate.titulo,
        descricao: ticketUpdate.descricao,
        finalizado: ticketUpdate.finalizado
      }
      this.dialogUpdate = true
    },
    async deleteTicket () {
      const token = await this.getToken()
      try {
        const { status, data } = await api.delete(`/tickets/${this.idTicket}`, {
          headers: { Authorization: token }
        })
        if (status === 200) {
          this.$q.notify({
            position: 'top-right',
            icon: 'check_circle_outline',
            type: 'positive',
            message: 'Registro apagado com sucesso!'
          })
        } else {
          this.$q.notify({
            position: 'top-right',
            icon: 'feedback',
            type: 'warning',
            message: data.message
          })
        }
      } catch (error) {
        console.log(error)
      }
      await this.getTickets()
      this.loading = false
    },
    popUpDelete (id) {
      this.confirmDelete = true
      this.loading = true
      this.idTicket = id
    },
    async getTickets () {
      const token = await this.getToken()
      try {
        const { data } = await api.get('/tickets', {
          headers: { Authorization: token }
        })
        this.tickets = data
      } catch (error) {}
    },
    async getToken () {
      return await localStorage.getItem('token')
    }
  },
  async mounted () {
    await this.getTickets()
  }
}
</script>
