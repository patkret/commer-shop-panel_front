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
      variantSets: [],
    },

    sets: [],
    variantSets: [],
    selectedSet: '',
    selectedVariants: [],
    otherVariants: [],
    selectedVariantSet: '',
    selectedRate: '',
    selectedVendor: '',
    selectedStock: '',
    selectedCategories: [],
    selectedMainCategory: '',
    test: [],
    attributesInSet: [],
    attributeSetDefaultCategories: [],
    attributeSetMainCategories: [],
    attributeSetChildren: [],
    attributeSetSubChildren: []
  },

  getters: {
    getProduct: state => state.product,
    getProductAttributeSets: state => {
      return state.product.attributeSets
    },
    sets: state => state.sets,
    variantSets: state => state.variantSets,
    selectedVariantSet: state => {
      return state.variantSets.find(
        el => el.id === state.product.selectedVariantSet)
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
    getVendor: state => state.selectedVendor,
    getVatRate: state => state.selectedRate,
    getStock: state => state.selectedStock,
    getCategory: state => state.selectedCategories,
    getMainCategory: state => state.selectedMainCategory,
    getAttributesInSet: state => state.attributesInSet,
    getAttributeSetDefaultCategories:
      state => state.attributeSetDefaultCategories,
    getAttributeSetMainCategories: state => state.attributeSetMainCategories,
    getAttributeSetChildrenCategories: state => state.attributeSetChildren,
    getAttributeSetSubChildrenCategories: state => state.attributeSetSubChildren,
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
      if (payload.length !== 0) {
        if (state.product.variantSets.length === 0) {
          console.log('if')
          let req = payload.variants.filter(
            variant => {return variant.required === 1 })
          let other = payload.variants.filter(
            variant => {return variant.required === false })
          state.product.variantSets = req
          state.otherVariants = other
          state.product.selectedVariantSet = payload.id

        }
        else {
          console.log('else')
          state.product.selectedVariantSet = payload.id
          // let other = payload.variants.filter(variant => {return variant.required === false })
          // state.otherVariants = other
          // state.otherVariants = payload.variants.filter(el => !state.product.variantSets.includes(el))
        }
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
        variantSets: [],
        categories: '',
        stock: '',
        main_category: '',
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
    },
    saveVatRate: (state, payload) => {
      state.selectedRate = payload
      state.product.vat_rate = payload.id
    },
    saveVendor: (state, payload) => {
      state.selectedVendor = payload
      state.product.vendor = payload.id
    },
    saveCategories: (state, payload) => {
      state.selectedCategories = payload
      state.product.category = payload.id
    },
    saveStock: (state, payload) => {
      state.selectedStock = payload
      state.product.stock = payload.id
    },
    saveMainCategory: (state, payload) => {
      state.selectedMainCategory = payload
      state.product.main_category = payload.id
    },
    getAttrSets: (state, payload) => {
      state.test = payload
    },

    setAttributeInSet: (state, payload) => {
      state.attributesInSet.push(payload)
    },
    setAttributeSetDefaultCategories: (state, payload) => {
      state.attributeSetDefaultCategories = payload
    },
    setAttributeSetMainCategories: (state, payload) => {
      state.attributeSetMainCategories = payload
    },
    setAttributeSetChildCategories: (state, payload) => {
      state.attributeSetChildren = payload
    },
    setAttributeSetSubChildrenCategories: (state, payload) => {
      state.attributeSetSubChildren = payload
    },
    clearSelectedCategories: state => {
      state.attributeSetDefaultCategories = []
      state.attributeSetMainCategories = []
      state.attributeSetChildren = []
      state.attributeSetSubChildren = []
    },
  },

  actions: {

    getProduct: (context, payload) => {
      axios('products/' + payload).then(result => {
          result.data.attributeSets = JSON.parse(result.data.attributeSets)
          result.data.variantSets = JSON.parse(result.data.variantSets)

          axios('vendors').then(response => {
            let ven = response.data.find(el => el.id === result.data.vendor)
            context.commit('saveVendor', ven)
          })
          axios('vat-rates').then(response => {
            let rate = response.data.find(el => el.id === result.data.vat_rate)
            context.commit('saveVatRate', rate)
          })
          axios('all-categories').then(response => {
            let main_cat = response.data.find(
              el => el.id === result.data.main_category)
            context.commit('saveMainCategory', main_cat)
          })
          axios('warehouses').then(response => {
            let stoc = response.data.find(el => el.id === result.data.stock)
            context.commit('saveStock', stoc)
          })
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

    getAttributeSets: (context, state) => {

      axios('attribute-sets-categories/' + state.product.main_category).
        then(result => {

            context.commit('getAttrSets', result.data)
          },
        )
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