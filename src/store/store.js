import Vue from 'vue'
import Vuex from 'vuex'
import attributeSets from './modules/attributeSets'
import products from './modules/products'
import variantSets from './modules/variantSets'
import orders from './modules/orders'
import clients from './modules/clients'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    attributeSets,
    products,
    variantSets,
    orders,
    clients
  }

})