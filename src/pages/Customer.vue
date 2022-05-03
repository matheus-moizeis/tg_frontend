<template>
  <q-page>
    <div class="row q-ml-sm q-mt-md">
      <div class="q-ml-md q-mt-md text-h4">Clientes</div>
    </div>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="clientes"
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
          <q-btn :to="{ name: 'CreateCustomer' }" color="primary">Novo</q-btn>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
             icon="create"
             color="primary"
             size="sm"
             @click="popUpUpdate(props.row)"
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
              @click="deleteCustomer"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog v-model="confirUpdate" persistent>
        <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Editar Cliente</div>
        </q-card-section>
    <div class="container">

      <q-form ref="customerForm">
        <div class="row justify-center q-gutter-sm">
          <q-input
            outlined
            v-model="updateData.nome"
            label="Nome"
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="updateData.cpf"
            mask="###.###.###-##"
            unmasked-value
            label="CPF"
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="updateData.dt_nascimento"
            stack-label
            type="date"
            label="Nascimento"
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="updateData.telefone"
            label="Celular"
            mask="(##) #####-####"
            unmasked-value
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="updateData.cep"
            label="CEP"
            mask="#####-###"
            unmasked-value
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="updateData.rua"
            label="Rua"
            class="col-sm-12 col-md-5 col-lg-5"
          />

          <q-input
            outlined
            v-model="updateData.bairro"
            label="Bairro"
            class="col-sm-12 col-md-5 col-lg-5"
          />
          <q-input
            outlined
            v-model="updateData.numero"
            label="Nº"
            class="col-sm-12 col-md-5 col-lg-5"
          />
        </div>
      </q-form>
    </div>

          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancelar"
              @click="loading = false"
              color="primary"
              v-close-popup
            />
            <q-btn
              flat
              label="Confirmar"
              color="positive"
              @click="updateCustomer"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
export default {
  name: 'CustomerPage',
  data () {
    return {
      updateData: {
        nome: null,
        cpf: null,
        telefone: null,
        dt_nascimento: null,
        rua: null,
        bairro: null,
        cep: null,
        numero: null,
        ativo: true
      },
      idCustomer: null,
      loading: false,
      dialog: false,
      filter: '',
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
          name: 'phone',
          align: 'center',
          label: 'Telefone',
          field: 'telefone',
          sortable: true
        },
        {
          name: 'actions'
        }
      ],
      confirmDelete: false,
      confirUpdate: false,
      clientes: []
    }
  },

  methods: {
    async updateCustomer () {
      console.log('entro' + this.oldCustomer.nome)
      await this.getClientes()
      this.loading = false
    },

    popUpUpdate (updateData) {
      this.confirUpdate = true
      this.loading = true
      this.oldCustomer.nome = updateData.nome
    },

    async deleteCustomer () {
      const token = await this.getToken()
      try {
        const { status, data } = await api.delete(
          `/clientes/${this.idCustomer}`,
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
      await this.getClientes()
      this.loading = false
    },

    popUpDelete (id) {
      this.confirmDelete = true
      this.loading = true
      this.idCustomer = id
    },

    async getClientes () {
      const token = await this.getToken()
      try {
        const { data } = await api.get('/clientes', {
          headers: { Authorization: token }
        })
        this.clientes = data
      } catch (error) {
        console.log(error)
      }
    },

    async getToken () {
      return await localStorage.getItem('token')
    }
  },
  async mounted () {
    await this.getClientes()
  }
}
</script>
