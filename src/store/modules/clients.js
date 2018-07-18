const state = {
  client: {
    first_name: '',
    last_name: '',
    company: '',
    city: '',
    phone_no: '',
    zip_code: '',
    NIP: '',
    email: '',
    apartment_no: '',
    house_no: '',
    shippingDetails: {
      first_name: '',
      last_name: '',
      company: '',
      city: '',
      zip_code: '',
      apartment_no: '',
      house_no: '',
    },
  },
}

const getters = {
  getClient: state => {
    return state.client
  },
}

const mutations = {
  setClient: (state, client) => {
    state.client = client
  },
  clearClientInfo: state => {
    state.client =  {
      first_name: '',
        last_name: '',
        company: '',
        city: '',
        phone_no: '',
        zip_code: '',
        NIP: '',
        email: '',
        apartment_no: '',
        house_no: '',
        shipping_details: {
        first_name: '',
          last_name: '',
          company: '',
          city: '',
          phone_no: '',
          zip_code: '',
          NIP: '',
          email: '',
          apartment_no: '',
          house_no: '',
      },
    }
  }
}

const actions = {}

export default {
  state,
  getters,
  mutations,
  actions,
}