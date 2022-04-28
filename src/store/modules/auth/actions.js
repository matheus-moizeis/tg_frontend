import { api } from 'boot/axios'

export function createUser (context, payload) {
  api.post('/users', payload)
    .then((response) => {

    })
    .catch((error) => {
      console.log(error)
    })
}
