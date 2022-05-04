<template>
  <q-page>
    <div class="row q-ml-sm q-mt-md">
      <div class="q-ml-md q-mt-md text-h4">Funcionários</div>
    </div>
        <div class="q-pa-md">
      <q-table
        :data="employees"
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
          <q-btn :to="{ name: 'CreateEmployee' }" color="primary">Novo</q-btn>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              icon="create"
              color="primary"
              @click="popUpUpdate(props.row.id)"
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
  name: 'EmployeePage',
  data () {
    return {
      loading: false,
      filter: '',
      employees: [],
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
          name: 'nome',
          align: 'center',
          label: 'Nome',
          field: 'nome',
          sortable: true
        },
        {
          name: 'telefone',
          align: 'center',
          label: 'Telefone',
          field: 'telefone',
          sortable: true
        },
        {
          name: 'actions'
        }
      ]
    }
  },
  methods: {
    async getEmployees () {
      const token = await this.getToken()
      try {
        const { data } = await api.get('/funcionarios', {
          headers: { Authorization: token }
        })
        this.employees = data
      } catch (error) {

      }
    },

    async getToken () {
      return await localStorage.getItem('token')
    }
  },
  async mounted () {
    await this.getEmployees()
  }
}
</script>
