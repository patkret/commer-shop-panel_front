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
                    <div class="side-button side-menu-item active" v-if="type == 3">
                        <p>Edycja kategorii</p>
                    </div>
                </div>
            </div>
            <div class="component-container">
                <add-category v-if="type == 1"></add-category>
                <category-list v-if="type == 2" @singleCategory="editCategory" @child="getChild"></category-list>
                <edit-category v-if="type == 3" :category="editingCategory" :childCategory="childCategory"></edit-category>
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
      childCategory: '',
      editingCategory: ''
    }),
    methods: {
      getChild(item){
        this.type = 3
        this.childCategory = item
        // console.log(this.childCategory)
      },
      changeComponent (type) {
        this.type = type
      },
      editCategory(category){
        this.type = 3
        this.editingCategory = category
      }
    },
  }
</script>

<style scoped>
    .active {
        background-color: #F3F4F8;
        border-radius: 5px;
    }

</style>