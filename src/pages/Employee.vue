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
              @click="deleteEmployee"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialogUpdate" persistent>
        <q-card style="width: 700px; max-width: 80vw">
          <q-card-section>
            <div class="text-h6">Editar Cliente</div>
          </q-card-section>

          <q-card-section class="q-pt-none"> </q-card-section>
          <q-form ref="customerForm" @submit="putEmployee">
            <div class="row justify-center q-gutter-sm">
              <q-input
                outlined
                v-model="emplyoeeUpdate.id"
                label="Id"
                disable
                readonly
                class="col-sm-12 col-md-5 col-lg-5"
              />
              <q-input
                outlined
                v-model="emplyoeeUpdate.nome"
                label="Nome"
                class="col-sm-12 col-md-5 col-lg-5"
              />

              <q-input
                outlined
                v-model="emplyoeeUpdate.telefone"
                label="Celular"
                mask="(##) #####-####"
                unmasked-value
                class="col-sm-12 col-md-5 col-lg-5"
              />

              <q-toggle
                v-model="emplyoeeUpdate.ativo"
                label="Ativo"
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
  name: 'EmployeePage',
  data () {
    return {
      dialogUpdate: false,
      emplyoeeUpdate: {},
      idEmployee: null,
      confirmDelete: false,
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
    async putEmployee () {
      const token = await this.getToken()
      try {
        const { status } = await api.put(
          `/funcionarios/${this.emplyoeeUpdate.id}`,
          this.emplyoeeUpdate,
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
          this.emplyoeeUpdate = {}
          await this.getEmployees()
          this.loading = false
        }
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },

    async popUpUpdate (employee) {
      this.loading = true
      this.emplyoeeUpdate = employee
      this.dialogUpdate = true
    },

    async deleteEmployee () {
      const token = await this.getToken()
      try {
        const { status, data } = await api.delete(
          `/funcionarios/${this.idEmployee}`,
          {
            headers: { Authorization: token }
          }
        )
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
      await this.getEmployees()
      this.loading = false
    },

    popUpDelete (id) {
      this.confirmDelete = true
      this.loading = true
      this.idEmployee = id
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

    async getToken () {
      return await localStorage.getItem('token')
    }
  },
  async mounted () {
    await this.getEmployees()
  }
}
</script>
