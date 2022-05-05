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
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
export default {
  name: 'TicketPage',
  data () {
    return {
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
