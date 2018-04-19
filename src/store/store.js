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
      depth: '',
      metaDescription: '',
      metaKeywords: '',
      addressUrl: '',
    },

    sets: [],
    variantSets: [],
    selectedSet: '',
    selectedVariants: [],
    otherVariants: []
  },

  getters: {
    getProduct: state => state.product,
    getProductAttributeSets: state => {
      return state.product.attributeSets
    },
    sets: state => state.sets,
    variantSets: state => state.variantSets,
    selectedVariantSet: state => state.selectedSet,
    selectedVariants: state => state.selectedVariants,
    otherVariants: state => state.otherVariants
  },

  mutations: {

    addProduct: (state, payload) => {
      console.log(payload)
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

    setSelectedVariants: (state, payload) => {
      state.selectedVariants = payload
    },

    setOtherVariants: (state, payload) => {
      state.otherVariants = payload
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
        metaDescription: '',
        metaKeywords: '',
        addressUrl: '',

      }
    },

    clearSelectedVariants: state => {
      state.selectedVariants = []
    }

  },

  actions: {

    getProduct: (context, payload) => {
      axios('products/' + payload).then(result => {
      context.commit('addProduct', result.data)
      }
    )
    },

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
    },
  },

})