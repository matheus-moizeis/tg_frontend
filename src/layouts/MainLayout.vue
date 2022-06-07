<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <div  class="q-pa-sm fixed-right">
          <q-btn-dropdown
            color="primary"
            dense
            dropdown-icon="manage_accounts"
            no-icon-animation
            unelevated >
            <q-list>
              <q-item clickable v-close-popup >
                <q-item-section>
                  <q-item-label @click="sairDoSistema">Sair</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list class="column justify-center">
        <q-item-label header class="text-grey-8">
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Clientes',
    icon: 'account_circle',
    routeName: 'Customer',
    caption: ''
  },
  {
    title: 'Funcionarios',
    icon: 'account_circle',
    routeName: 'Employee',
    caption: ''
  },
  {
    title: 'Tickets',
    icon: 'chat',
    routeName: 'Ticket',
    caption: ''
  }
]

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },

  methods: {
    sairDoSistema () {
      localStorage.setItem('token', '')
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
