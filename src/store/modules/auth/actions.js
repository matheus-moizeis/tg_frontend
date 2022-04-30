import { api } from 'boot/axios'

export async function createUser ({ commit }, payload) {
  try {
    const { status, data } = await (api.post('/users', payload))
    commit('setUser', { status, data })
    if (status === 200) {
      this.$router.push({ name: 'Login' })
    }
  } catch (error) {
    const { status, data } = error
    commit('setUser', { status, data })
  }
}
