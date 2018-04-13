// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import env from './env'
import normalize from 'normalize.css'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate'
import Multiselect from 'vue-multiselect'
import multiselectStyle from 'vue-multiselect/dist/vue-multiselect.min.css'
import VueSweetalert2 from 'vue-sweetalert2'
import Vuex from 'vuex'
import axios from 'axios'

import './assets/css/main.css'
import './assets/css/custom-buttons.css'

Vue.config.productionTip = false

Vue.use(normalize)
Vue.use(VeeValidate)
Vue.use(multiselectStyle)
Vue.component('multiselect', Multiselect)
Vue.use(VueSweetalert2)
Vue.use(Vuex)

window.axios = axios

axios.interceptors.request.use(config => {

  let token = localStorage.getItem('token')

  if (token) {
    config.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    router.push({path: '/login'})
  }
  return config
})
axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('token')
    router.push({path: '/login'})
  }
  return error
})
axios.defaults.baseURL = env.API_URL

let token = localStorage.getItem('token')
if (!token) {
  router.push({path: '/login'})
} else {
  // router.push({path: '/dashboard'})
}
const dictionary = {
  pl: {
    messages: {
      required: () => 'Pole obowiązkowe',
      numeric: () => 'Pole może zawierać tylko cyfry ',
      max_value: () => 'Podaj odpowiednią wartość',
      confirmed: () => 'Hasła muszą być takie same',
    },
  },
}

Validator.localize(dictionary)

const validator = new Validator({
  required: 'required',
  numeric: 'numeric',
  max_value: 'max_value',
  confirmed: 'confirmed',
})

validator.localize('pl')

const store = new Vuex.Store({
  state: {
    product: {
      name: '',
      price: '',
      vat_rate: '',
      symbol: '',
      visibility: 1,
      barcode: '',
      pkwiuCode: '',
      vendor: '',
      attributeSets: '',
      stock: '',
      stockAvail: '',
      intoStockPrice: '',
      shortDescription: '',
      longDescription: '',
      weight: '',
      height: '',
      width: '',
      depth: ''
    },

    sets: [],
  },

  getters: {
    getProduct: state => state.product,
    getProductAttributeSets: state => {
      return state.product.attributeSets
    },
    sets: state => state.sets,
  },

  mutations: {
    addProduct: (state, payload) => {
      state.product = payload
    },

    saveProductAttributes: (state, payload) => {
      state.product.attributeSets = payload
    },

    getSets: (state, payload) => {
      state.sets = payload
    },

    clearProduct: state => {
      state.product =  {
        name: '',
        price: '',
        vat_rate: '',
        symbol: '',
        visibility: 1,
        barcode: '',
        pkwiuCode: '',
        vendor: '',
        attributeSets: [],
        stock: '',
        stockAvail: '',
        intoStockPrice: '',
        shortDescription: '',
        longDescription: '',
        weight: '',
        height: '',
        width: '',
        depth: '',

      }
    }

  },

  actions: {

    getSets: context => {

      axios('attribute-sets').then(result => {
        let sets = result.data
        for (let set of sets) {
          set.attributes = JSON.parse(set.attributes)
        }
        context.commit('getSets', sets)
      })
    },
  },

})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
})

