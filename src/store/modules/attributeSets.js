import axios from 'axios/index'

const state = {
  attributeSet: [],
  attributesInSet: [],
  attributeSetDefaultCategories: [],
  attributeSetMainCategories: [],
  attributeSetChildren: [],
  attributeSetSubChildren: [],
}

const getters = {
  getAttributeSet: state => {
    return state.attributeSet
  },
  getAttributesInSet: state => {
    return state.attributesInSet
  },
  getAttributeSetDefaultCategories: state => {
    return state.attributeSetDefaultCategories
  },
  getAttributeSetMainCategories: state => {
    return state.attributeSetMainCategories
  },
  getAttributeSetChildrenCategories: state => {
    return state.attributeSetChildren
  },
  getAttributeSetSubChildrenCategories: state => {
    return state.attributeSetSubChildren
  },
}

const mutations = {
  setAttributeInSet: (state, attribute) => {
    state.attributesInSet.push(attribute)
  },
  setAttributeSetDefaultCategories: (state, categories) => {
    let unique = Array.from(new Set(categories))
    state.attributeSetDefaultCategories = unique
  },
  setAttributeSetMainCategories: (state, mainCategories) => {
    state.attributeSetMainCategories = mainCategories
  },
  setAttributeSetChildCategories: (state, children) => {
    state.attributeSetChildren = children
  },
  setAttributeSetSubChildrenCategories: (state, child) => {
    state.attributeSetSubChildren.push(child)
  },
  clearSelectedCategories: state => {
    state.attributeSetDefaultCategories = []
    state.attributeSetMainCategories = []
    state.attributeSetChildren = []
    state.attributeSetSubChildren = []
  },
  clearAttributesInSet: state => {
    state.attributesInSet = []
  },
  attributeSet: (state, attrSet) => {
    var childrenIds = []
    function getDefaultCategories () {
      let ids = []
      attrSet.categories.forEach(function (el) {
        if (el.parent_id === 0) {
          ids.push(el.id)
        }
        else{
          childrenIds.push(el.id)
        }

      })
      return ids
    }

    state.attributeSet = attrSet
    state.attributesInSet = JSON.parse(attrSet.attributes)
    state.attributeSetMainCategories = getDefaultCategories()
    state.attributeSetChildren = childrenIds
    state.attributeSetSubChildren = childrenIds
  },
}

const actions = {
  fetchAttributeSet ({commit}, id) {
    axios(`attribute-sets/${id}`).
      then(result => commit('attributeSet', result.data))
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}