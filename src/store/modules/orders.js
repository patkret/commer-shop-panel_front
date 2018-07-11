import axios from 'axios/index'

const state = {

  order: {
    client: {
      first_name: '',
      last_name: '',
      company: '',
      email: '',
      phone_no: '',
      NIP: '',
      street: '',
      apartment_no: '',
      house_no: '',
      zip_code: '',
      city: '',
    },
    shipping_details: {
      street: '',
      apartment_no: '',
      house_no: '',
      zip_code: '',
      city: '',
    },
    notes: ''

  },

  clients: []

}

const getters = {
  getOrder: state => {
    return state.order
  },
  getClients: state => {
    return state.clients
  }
}

const mutations = {
  setClients: (state, clients) => {
    state.clients = clients
  }
}

const actions = {
  fetchClients: ({commit}) => {
    axios('clients').then(response => commit('setClients', response.data),
    )
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}