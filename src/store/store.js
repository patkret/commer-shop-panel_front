import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
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
    variantSets: [],
    selectedSet: ''
  },

  getters: {
    getProduct: state => state.product,
    getProductAttributeSets: state => {
      return state.product.attributeSets
    },
    sets: state => state.sets,
    variantSets: state => state.variantSets,
    selectedVariantSet: state => state.selectedSet
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

    getVariantSets: (state, payload) => {
      state.variantSets = payload
    },

    selectedVariantSet: (state, payload) => {
      state.selectedSet = payload
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

    getVariantSets: context => {
      axios('variant-groups').then(result => {
        let variantSets = result.data
        for (let set of variantSets) {
          set.variants = JSON.parse(set.variants)
        }
        context.commit('getVariantSets', result.data)
      })
    }
  },

})