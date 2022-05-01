<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="show">
      <q-card style="width: 750px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>
            <q-form ref="loginForm" @submit="onSubmit" class="q-gutter-md">
              <q-input
                filled
                v-model="formData.email"
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
                v-model="formData.password"
                label="Senha *"
                lazy-rules
                :rules="passwordRules"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
              <div class="column q-gutter-md">
                <q-btn label="Entrar" type="submit" color="primary" />
                <q-btn
                  label="Cadastrar"
                  :to="{ name: 'CreateUser' }"
                  flat
                  color="primary"
                />
              </div>
            </q-form>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn label="Salvar" @click="save"></q-btn>
          <q-btn flat label="Fechar" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogTickets',
  props: {
    ticket: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Boolean
    }
  },
  data () {
    return {
      values: {}
    }
  },
  computed: {
    title () {
      return this.isEdit ? 'Editar' : 'Cadastrar'
    },
    isEdit () {
      return !!Object.keys(this.ticket).length
    },
    show: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  },
  methods: {
    async onSubt () {
      console.log()
    },
    save () {
      console.log(this.values.Funcionario.nome)
    }
  },
  beforeMount () {
    this.values = this.ticket
    console.log(this.ticket)
  },
  Unmounted () {
    console.log('entro')
  }
}
</script>
