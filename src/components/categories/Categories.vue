

<template>
     <div class="l-main__main">
        <header class="l-main__header component__header">

            <div class="c-breadcrumb">
                        <span class="c-breadcrumb__item">
                            Kategorie
                        </span>
            </div>
            <div class="main-header__button" >
                <router-link to="/categories/list/add" class="c-form__button c-button" v-if="$route.path !== '/categories/list/add'">
                    <span>Dodaj kategorie</span>
                </router-link>
                <router-link to="/categories/list" class="c-form__button c-button" v-if="$route.path !== '/categories/list'">
                    <span>Powrót</span>
                </router-link>
            </div>
        </header>

        <section class="l-main__content" style="padding: 0">
            <router-view></router-view>
        </section>

    </div>
</template>

<script>

  import AddCategory from './AddCategory'
//   import EditCategory from './EditCategory'
  import CategoriesList from './CategoriesList'
//   import DuplicateCategory from './DuplicateCategory'

  export default {
    name: 'Categories',
    components: {
      CategoriesList,
    //   EditCategory,
      AddCategory,
    //   DuplicateCategory,

    },
    data: () => ({
      type: 2,
      categories: '',
      childCategory: '',
      editingCategory: '',
      duplicatingCategory: '',
    }),
    methods: {
      getChild(item){
        this.type = 3
        this.childCategory = item
      },
      changeComponent (type) {
        this.type = type
      },
      editCategory(category){
        this.type = 3
        this.editingCategory = category
      },
      duplicateCategory(category) {
        this.type = 4
        this.duplicatingCategory = category
      }
    },
  }
</script>

<style scoped>
    .active {
        background-color: #F3F4F8;
        border-radius: 5px;
    }
    .slide-fade-enter-active {
        transition: all 1.3s ease;
        transform: translateY(-5px) ;
    }
    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    {
        transform: translateY(5px);
        opacity: 0;
    }

</style>