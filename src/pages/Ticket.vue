<template>
  <q-page>
    <div class="row q-ml-sm q-mt-md">
      <div class="q-ml-md q-mt-md text-h4">Tickets</div>
    </div>
    <div class="q-pa-md">
      <q-table
        grid
        title="Tickets"
        grid-header
        :data="tickets"
        :columns="columns"
        row-key="id"
        :filter="filter"
        hide-header
        @row-click="callDialog"
      >
        <template v-slot:top-left>
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
        <template v-slot:top-right>
          <q-btn @click="toggleDialog" color="primary">Novo</q-btn>
        </template>
      </q-table>
    </div>
    <DialogTickets v-model="showDialog" :ticket="ticket" />
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import DialogTickets from 'src/components/Tickets/DialogTickets.vue'
export default {
  components: { DialogTickets },
  name: 'PageToken',
  data () {
    return {
      showDialog: false,
      filter: '',
      columns: [
        {
          id: 'id',
          field: (row) => row.id,
          sortable: true,
          label: 'Id: '
        },
        {
          name: 'title',
          align: 'center',
          field: 'titulo',
          sortable: true,
          label: 'Título:'
        },
        {
          name: 'description',
          field: 'descricao',
          sortable: true,
          label: 'Descrição:'
        },
        {
          name: 'client',
          label: 'Cliente:',
          field: (row) => row?.Cliente?.nome || 'Não possui',
          sortable: true
        },
        {
          name: 'employee',
          label: 'Funcionario:',
          field: (row) => row?.Funcionario?.nome || 'Não possui',
          sortable: true
        }
      ],
      tickets: [],
      ticket: {}
    }
  },
  watch: {
    showDialog (value) {
      if (value) return
      this.ticket = {}
    }
  },
  methods: {
    toggleDialog () {
      this.showDialog = !this.showDialog
    },

    async getTickets () {
      const token = await this.getToken()
      try {
        const { data } = await api.get('/tickets', {
          headers: { Authorization: token }
        })
        this.tickets = data
      } catch (error) {
        console.log(error)
      }
    },

    async callDialog (env, row) {
      this.toggleDialog()
      this.ticket = row
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
