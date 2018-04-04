<template>
    <div>
        <div id="main-content-with-side-menu">
            <h1 class="card-name">Kategorie</h1>
            <div class="side-menu-container">
                <div id="side-menu">
                    <div class="side-button" :class="{'side-menu-item': true, 'side-menu-item active': type == 1}"
                         @click.prevent="changeComponent(1)">
                        <p>Dodaj kategorie</p>
                    </div>
                    <div class="side-button" :class="{'side-menu-item' : true, 'side-menu-item active': type == 2}"
                         @click.prevent="changeComponent(2)">
                        <p>Wszystkie kategorie</p>

                    </div>
                </div>
            </div>
            <div class="component-container">
                <add-category v-if="type == 1"></add-category>
                <category-list v-if="type == 2"></category-list>
            </div>
        </div>

    </div>
</template>

<script>

  import AddCategory from './AddCategory'
  import EditCategory from './EditCategory'
  import CategoryList from './CategoryList'

  export default {
    name: 'Categories',
    components: {

      CategoryList,
      EditCategory,
      AddCategory,

    },
    data: () => ({
      type: 2,
      categories: '',
    }),
    methods: {

      changeComponent (type) {
        this.type = type
      },
    },
  }
</script>

<style scoped>


</style>