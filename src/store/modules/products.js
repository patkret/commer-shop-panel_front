import axios from 'axios/index'

const state = {
  product: {
    name: '',
    price: '',
    wholesale_price: '',
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
    meta_description: '',
    meta_keywords: '',
    url: '',
    selectedVariantSet: '',
    variantSets: [],
    warehouse_id: '',
    weight_unit: '',
    mainCategory: {},
    related_products: [],
  },

  stocks: [],
  vatRates: [],
  vendors: [],
  categories: [],
  attributeSets: [],
  selectedAttributeSets: [],
  variantSets: [],
  selectedVariantSet: '',
  selectedVariants: [],
  selectedProducts: [],
  selectedProductsIds: [],
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
  getVariantSets: state => {
    return state.variantSets
  },
  getSelectedVariantSet: state => {
    return state.selectedVariantSet
  },
  getSelectedVariants: state => {
    return state.selectedVariants
  },
  getSelectedProducts: state => {
    return state.product.related_products
  },
  getSelectedProductsIds: state => {
    return state.selectedProductsIds
  },
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
  setVariantSets: (state, variantSets) => {
    state.variantSets = variantSets
  },
  setSelectedVariantSet: (state, variantSet) => {
    state.selectedVariantSet = variantSet
  },
  addRequiredVariants: (state, variant) => {
    state.selectedVariants.push(variant)
  },
  setSelectedVariants: (state, variants) => {
    state.selectedVariants = variants
  },
  setSelectedProducts: (state, products) => {
    state.product.related_products = products
  },
  setSelectedProductsIds: (state, ids) => {
    state.selectedProductsIds = ids
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
      selectedVariantSet: '',
      variantSets: [],
      warehouse_id: '',
      weight_unit: '',
      mainCategory: {},
    }
  },
  clearState: state => {
    state.stocks = []
    state.vatRates = []
    state.vendors = []
    state.categories = []
    state.attributeSets = []
    state.selectedAttributeSets = []
    state.variantSets = []
    state.selectedVariantSet = ''
    state.selectedVariants = []
  },
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
    axios(`products/${id}`).then(response => {

        response.data.attributeSets = JSON.parse(response.data.attributeSets)
        response.data.variantSets = JSON.parse(response.data.variantSets)
        commit('setProduct', response.data)
        if(!!response.data.variantSets){
          let selectedVariants = response.data.variantSets.selectedVariants
          axios(`variant-groups`).then(result => {
            //find selected variantSet
            let variantSet = result.data.find(
              item => item.id === response.data.variantSets.id)
            variantSet.variants = JSON.parse(variantSet.variants)

            //remove duplicate variants
            variantSet.variants.forEach(el => {
              selectedVariants.forEach(item => {
                if (item.name === el.name) {
                  let index = variantSet.variants.indexOf(el)
                  variantSet.variants.splice(index, 1)
                }
              })
            })
            variantSet.variants = variantSet.variants.concat(selectedVariants)
            commit('setSelectedVariantSet', variantSet)
          })
          commit('setSelectedVariants', response.data.variantSets.selectedVariants)
        }
        if(!!response.data.attributeSets){
          axios(`categories/${response.data.main_category.id}/attribute-sets`).then(res => {

            res.data.attribute_sets.forEach(item => {
              item.attributes = JSON.parse(item.attributes)

              response.data.attributeSets.map(el => {
                if(el.id === item.id){
                  let indexOfSet = res.data.attribute_sets.indexOf(item)
                  res.data.attribute_sets.splice(indexOfSet, 1)
                }
              })
            })




            res.data.attribute_sets = res.data.attribute_sets.concat(response.data.attributeSets)
            commit('setAttributeSets', res.data.attribute_sets)
          })
          commit('setSelectedAttributeSets', response.data.attributeSets)
        }

      // console.log(response.data.attributeSets)
      },
    )
  },
  fetchVariantSets: ({commit}) => {
    axios(`variant-groups`).then(response => {
      response.data.forEach(el => {
        el.variants = JSON.parse(el.variants)
      })
      commit('setVariantSets', response.data)
    })
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
