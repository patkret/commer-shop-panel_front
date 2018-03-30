<template>
    <div id="main-content-with-side-menu">
    <h1 class="card-name">Warianty</h1>
    <div class="side-menu-container">
        <div id="side-menu">
            <div class="side-button" :class="{'side-menu-item': true, 'side-menu-item active': type == 1}" @click.prevent="changeComponent(1)">
                <p>Dodaj wariant</p>
            </div>
            <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type == 2}" @click.prevent="changeComponent(2)">
                <p>Wszystkie warianty</p>
            </div>
        </div>
    </div>
    <div class="component-container">
        <variants-set-form v-if="type == 1"></variants-set-form>
        <variants-list v-if="type == 2"></variants-list>
    </div>
</div>
</template>

<script>
    import VariantsSetForm from './VariantsSetForm'
    import VariantsList from './VariantsList'

  export default {
    name: "variants",
    components: {
      VariantsSetForm,
      VariantsList,
    },
    data: () => ({
      type: 2,
    }),
    methods: {
      changeComponent(type) {
        this.type = type
      }
    },
  }
</script>

<style scoped>

</style>