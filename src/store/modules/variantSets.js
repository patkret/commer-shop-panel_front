import axios from 'axios/index'

const state = {
  variantSet: {
    name: ''
  },
  variants: [],
}

const getters = {
  getVariants: state => {
    return state.variants
  },
  getVariantSet: state => {
    return state.variantSet
  }
  // getVariantToEdit: (state, index) => {
  //   return state.variants[index]
  // }
}

const mutations = {
  setVariant: (state, variant) => {
    state.variants.push(variant)
  },
  removeVariant: (state, index) => {
    state.variants.splice(index, 1)
  },
  clearForm: state => {
    state.variants = []
    state.variantSet = {
      name: ''
    }
  },
  setVariantSet: (state, variantSet) => {
    state.variantSet = variantSet
  },

  setVariants: (state, variants) => {
    state.variants = variants
  }
}
const actions = {
  fetchVariantSet (context, id) {
    axios(`variant-groups/${id}`).
      then(result => {
        result.data.variants = JSON.parse(result.data.variants)
        context.commit('setVariantSet', result.data)
        context.commit('setVariants', result.data.variants)

      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}