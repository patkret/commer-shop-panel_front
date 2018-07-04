import axios from 'axios/index'

const state = {
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
    warehouse_id: '',
    weight_unit: '',
    mainCategory: {},
  },

  stocks: [],
  vatRates: [],
  vendors: [],
  categories: [],
  attributeSets: [],
  selectedAttributeSets: [],
  //
  // sets: [],
  //   variantSets: [],
  //   selectedSet: '',
  //   selectedVariants: [],
  //   otherVariants: [],
  //   selectedVariantSet: '',
  //   selectedRate: '',
  //   selectedVendor: '',
  //   selectedStock: '',
  //   selectedCategories: [],
  //   selectedMainCategory: '',
  //   test: [],

}

const getters = {
  getProduct: state => {
    return state.product
  },

  getVatRates: state => {
    return state.vatRates
  },
  getStocks: state => {
    return state.stocks
  },
  getVendors: state => {
    return state.vendors
  },
  getCategories: state => {
    return state.categories
  },
  getAttributeSets: state => {
    return state.attributeSets
  },
  getselectedAttributeSets: state => {
    return state.selectedAttributeSets
  },
  //     getProductAttributeSets: state => {
  //   return state.product.attributeSets
  // },
  //   sets: state => state.sets,
  //   variantSets: state => state.variantSets,
  //   selectedVariantSet: state => {
  //   return state.variantSets.find(
  //     el => el.id === state.product.selectedVariantSet)
  // },
  //   selectedVariants: state => state.product.variantSets,
  //   otherVariants: state => state.otherVariants,
  //   getNotSelectedSets: state => {
  //   state.sets.forEach(item => {
  //     state.product.attributeSets.forEach(el => {
  //       if (item.id === el.id) {
  //         let index = state.sets.indexOf(item)
  //         state.sets.splice(index, 1)
  //       }
  //     })
  //   })
  //   return state.sets
  // },
  //   getVendor: state => state.selectedVendor,
  //   getVatRate: state => state.selectedRate,
  //   getStock: state => state.selectedStock,
  //   getCategory: state => state.selectedCategories,
  //   getMainCategory: state => state.selectedMainCategory,

}

const mutations = {
  setVatRates: (state, rates) => {
    state.vatRates = rates
  },
  setStocks: (state, stocks) => {
    state.stocks = stocks
  },
  setVendors: (state, vendors) => {
    state.vendors = vendors
  },
  setCategories: (state, categories) => {
    state.categories = categories
  },
  setAttributeSets: (state, attributeSets) => {
    state.attributeSets = attributeSets
  },
  setSelectedAttributeSets: (state, selected) => {
    state.selectedAttributeSets = selected
  },
  setProduct: (state, product) => {
    state.product = product
  },

  // addProduct: (state, payload) => {
  //   state.product = payload
  // },
  //
  //   saveProductAttributes: (state, payload) => {
  //   state.product.attributeSets = payload
  // },
  //
  //   getSets: (state, payload) => {
  //   state.sets = payload
  // },
  //
  //   getVariantSets: (state, payload) => {
  //   state.variantSets = payload
  // },
  //
  //   selectedVariantSet: (state, payload) => {
  //   state.selectedSet = payload
  //   if (payload.length !== 0) {
  //     if (state.product.variantSets.length === 0) {
  //       console.log('if')
  //       let req = payload.variants.filter(
  //         variant => {return variant.required === 1 })
  //       let other = payload.variants.filter(
  //         variant => {return variant.required === false })
  //       state.product.variantSets = req
  //       state.otherVariants = other
  //       state.product.selectedVariantSet = payload.id
  //
  //     }
  //     else {
  //       console.log('else')
  //       state.product.selectedVariantSet = payload.id
  //       // let other = payload.variants.filter(variant => {return variant.required === false })
  //       // state.otherVariants = other
  //       // state.otherVariants = payload.variants.filter(el => !state.product.variantSets.includes(el))
  //     }
  //   }
  //
  // },
  //
  //   setSelectedVariants: (state, payload) => {
  //   state.product.variantSets = payload
  // },
  //
  //   setOtherVariants: (state, payload) => {
  //   state.otherVariants = payload
  // },
  //
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
      selectedVariantSet: '',
      variantSets: [],
      warehouse_id: '',
      weight_unit: '',
      mainCategory: {},
    }
  },
  //
  //   clearSelectedVariants: state => {
  //   state.selectedVariants = []
  // },
  //
  //   clearSets: state => {
  //   state.sets = []
  // },
  //   clearOtherSets: state => {
  //   state.otherVariants = []
  // },
  //   saveVatRate: (state, payload) => {
  //   state.selectedRate = payload
  //   state.product.vat_rate = payload.id
  // },
  //   saveVendor: (state, payload) => {
  //   state.selectedVendor = payload
  //   state.product.vendor = payload.id
  // },
  //   saveCategories: (state, payload) => {
  //   state.selectedCategories = payload
  //   state.product.category = payload.id
  // },
  //   saveStock: (state, payload) => {
  //   state.selectedStock = payload
  //   state.product.stock = payload.id
  // },
  //   saveMainCategory: (state, payload) => {
  //   state.selectedMainCategory = payload
  //   state.product.main_category = payload.id
  // },
  //   getAttrSets: (state, payload) => {
  //   state.test = payload
  // },

}

const actions = {

  fetchRates: ({commit}) => {
    axios('vat-rates').then(response => commit('setVatRates', response.data),
    )
  },
  fetchStocks: ({commit}) => {
    axios('warehouses').then(response => commit('setStocks', response.data),
    )
  },
  fetchVendors: ({commit}) => {
    axios('vendors').then(response => commit('setVendors', response.data),
    )
  },
  fetchCategories: ({commit}) => {
    axios('all-categories').
      then(response => commit('setCategories', response.data),
      )
  },
  fetchAttributeSets: ({commit}, id) => {
    axios(`categories/${id}/attribute-sets`).then(response => {
      response.data.attribute_sets.forEach(
        item => item.attributes = JSON.parse(item.attributes))
      commit('setAttributeSets', response.data.attribute_sets)
    })
  },
  fetchProduct: ({commit}, id) => {
    axios(`products/${id}`).then(response => commit('setProduct', response.data),
    )
  },
  //
  // getProduct: (context, payload) => {
  //   axios('products/' + payload).then(result => {
  //       result.data.attributeSets = JSON.parse(result.data.attributeSets)
  //       result.data.variantSets = JSON.parse(result.data.variantSets)
  //
  //       axios('vendors').then(response => {
  //         let ven = response.data.find(el => el.id === result.data.vendor)
  //         context.commit('saveVendor', ven)
  //       })
  //       axios('vat-rates').then(response => {
  //         let rate = response.data.find(el => el.id === result.data.vat_rate)
  //         context.commit('saveVatRate', rate)
  //       })
  //       axios('all-categories').then(response => {
  //         let main_cat = response.data.find(
  //           el => el.id === result.data.main_category)
  //         context.commit('saveMainCategory', main_cat)
  //       })
  //       axios('warehouses').then(response => {
  //         let stoc = response.data.find(el => el.id === result.data.stock)
  //         context.commit('saveStock', stoc)
  //       })
  //       context.commit('addProduct', result.data)
  //     },
  //   )
  // },
  //
  //   getSets: context => {
  //
  //   axios('attribute-sets').then(result => {
  //     let sets = result.data
  //     for (let set of sets) {
  //       set.attributes = JSON.parse(set.attributes)
  //     }
  //     context.commit('getSets', sets)
  //   })
  // },
  //
  //   getAttributeSets: (context, state) => {
  //
  //   axios('attribute-sets-categories/' + state.product.main_category).
  //     then(result => {
  //
  //         context.commit('getAttrSets', result.data)
  //       },
  //     )
  // },
  //
  //   getVariantSets: context => {
  //   axios('variant-groups').then(result => {
  //     let variantSets = result.data
  //     for (let set of variantSets) {
  //       set.variants = JSON.parse(set.variants)
  //     }
  //     context.commit('getVariantSets', result.data)
  //   })
  // },
}

export default {
  state,
  getters,
  actions,
  mutations,
}