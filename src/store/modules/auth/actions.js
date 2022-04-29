import { api } from 'boot/axios'

export async function createUser ({ commit }, payload) {
  try {
    const { status, data } = await api.post('/users', payload).response
    commit('setUser', {status, data})
  }
  catch (error) {
    const { status, data } = error.response
    commit('setUser', errorCreate)
  }
}
