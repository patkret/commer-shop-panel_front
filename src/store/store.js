import Vue from 'vue'
import Vuex from 'vuex'
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
      selectedVariantSet: '',
      variantSets: []
    },

    sets: [],
    variantSets: [],
    selectedSet: '',
    selectedVariants: [],
    otherVariants: [],
    selectedVariantSet: ''
  },

  getters: {
    getProduct: state => state.product,
    getProductAttributeSets: state => {
      return state.product.attributeSets
    },
    sets: state => state.sets,
    variantSets: state => state.variantSets,
    selectedVariantSet: state => {
     return state.variantSets.find(el => el.id === state.product.selectedVariantSet)
    },
    selectedVariants: state => state.product.variantSets,
    otherVariants: state => state.otherVariants,
    getNotSelectedSets: state => {
      state.sets.forEach(item => {
        state.product.attributeSets.forEach(el => {
          if (item.id === el.id) {
            let index = state.sets.indexOf(item)
            state.sets.splice(index, 1)
          }
        })
      })
      return state.sets
    },
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
      if(state.product.variantSets.length === 0){
        let req = payload.variants.filter(variant => {return variant.required === 1 })
        let other = payload.variants.filter(variant => {return variant.required === false })
        state.product.variantSets = req
        state.otherVariants = other
        state.product.selectedVariantSet = payload.id

      }
      else {
        state.otherVariants = payload.variants.filter(el => !state.product.variantSets.includes(el))
      }
    },

    setSelectedVariants: (state, payload) => {
      state.product.variantSets = payload
    },

    setOtherVariants: (state, payload) => {
      state.otherVariants = payload
    },

    clearProduct: state => {
      state.product = {
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
        variantSets: []

      }
    },

    clearSelectedVariants: state => {
      state.selectedVariants = []
    },

    clearSets: state => {
      state.sets = []
    },
    clearOtherSets: state => {
      state.otherVariants = []
    }

  },

  actions: {

    getProduct: (context, payload) => {
      axios('products/' + payload).then(result => {
          result.data.attributeSets = JSON.parse(result.data.attributeSets)
          result.data.variantSets = JSON.parse(result.data.variantSets)
          context.commit('addProduct', result.data)
        },
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