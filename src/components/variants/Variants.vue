<template>
    <div id="main-content-with-side-menu">
        <h1 class="card-name">Warianty</h1>
        <div class="side-menu-container">
            <div id="side-menu">
                <div class="side-button" :class="{'side-menu-item': true, 'side-menu-item active': type == 1}"
                     @click.prevent="changeComponent(1)">
                    <p>Dodaj zestaw</p>
                </div>
                <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type == 2}"
                     @click.prevent="changeComponent(2)">
                    <p>Wszystkie zestawy</p>
                </div>
                <div class="side-button side-menu-item active" v-if="type == 3">
                    <p>Edycja zestawu</p>
                </div>
            </div>
        </div>
        <div class="component-container">
            <variants-set-form v-if="type == 1" :side_type="type"></variants-set-form>
            <variants-list v-if="type == 2" @singleVariant="editSet"></variants-list>
            <variants-set-form v-if="type == 3" :set=set></variants-set-form>
        </div>
    </div>
</template>

<script>
  import VariantsSetForm from './VariantsSetForm'
  import VariantsList from './VariantsList'

  export default {
    name: 'variants',
    components: {
      VariantsSetForm,
      VariantsList,
    },
    data: () => ({
      type: 2,
      set: '',

    }),
    methods: {
      changeComponent (type) {
        this.type = type

      },

      editSet (set) {
        this.set = set
        this.type = 3
      },
    },
  }
</script>

<style scoped>
    .active {
        background-color: #F4F4F9;
        border-radius: 5px;
    }
</style>