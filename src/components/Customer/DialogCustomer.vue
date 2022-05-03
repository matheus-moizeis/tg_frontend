<template>
  <div class="q-pa-md q-gutter-sm">

    <q-dialog>
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
            <q-btn label="Voltar" color="grey-8" :to="{ name: 'customer' }" />
          </div>
        </div>
      </q-form>
    </div>
    </q-dialog>

  </div>
</template>
<script>

export default {
  name: 'DialogCustomer'

}
</script>
