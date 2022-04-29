import { api } from 'boot/axios'

export function createUser (context, payload) {
  api.post('/users', payload)
    .then((response) => {
      const userCreated = {
        statusCode: response.status,
        bodyRequest: response.data
      }
      context.commit('createUser', userCreated)
    })
    .catch((error) => {
      const errorCreate = {
        statusCode: error.response.status,
        bodyRequest: error.response.data
      }
      context.commit('createUser', errorCreate)
    })
}
